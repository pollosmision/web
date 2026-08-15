import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

import { ProductPrice } from '../../catalog/models/product.model';
import { CatalogService } from '../../catalog/services/catalog.service';
import { AddToCartSelection, CartItem } from '../models/cart-item.model';

const CART_STORAGE_KEY = 'pollos-mision-cart';
const CART_STORAGE_VERSION = 3;
const MAX_ITEM_QUANTITY = 99;

interface StoredCart {
  readonly version: typeof CART_STORAGE_VERSION;
  readonly items: readonly CartItem[];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly catalog = inject(CatalogService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly itemsState = signal<readonly CartItem[]>(this.restoreCart());

  readonly items = this.itemsState.asReadonly();
  readonly totalUnits = computed(() =>
    this.itemsState().reduce((total, item) => total + item.quantity, 0),
  );
  readonly subtotal = computed<number | null>(() => {
    const items = this.itemsState();
    if (items.some((item) => item.unitPrice === null)) {
      return null;
    }

    return items.reduce((total, item) => total + (item.unitPrice?.amount ?? 0) * item.quantity, 0);
  });

  constructor() {
    effect(() => {
      const cart: StoredCart = { version: CART_STORAGE_VERSION, items: this.itemsState() };
      if (this.isBrowser) {
        try {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch {
          // Keep the cart usable in memory if browser storage is unavailable or full.
        }
      }
    });
  }

  addItem(selection: AddToCartSelection): void {
    const item = this.createCartItem(selection);

    this.itemsState.update((items) => {
      const existingItem = items.find((currentItem) => currentItem.id === item.id);
      if (!existingItem) {
        return [...items, item];
      }

      return items.map((currentItem) =>
        currentItem.id === item.id
          ? {
              ...currentItem,
              productName: item.productName,
              imageUrl: item.imageUrl,
              visualLabel: item.visualLabel,
              unitPrice: item.unitPrice,
              quantity: Math.min(MAX_ITEM_QUANTITY, currentItem.quantity + item.quantity),
            }
          : currentItem,
      );
    });
  }

  increaseQuantity(itemId: string): void {
    this.updateQuantity(itemId, 1);
  }

  decreaseQuantity(itemId: string): void {
    const item = this.itemsState().find((currentItem) => currentItem.id === itemId);
    if (!item) return;

    if (item.quantity === 1) {
      this.removeItem(itemId);
      return;
    }

    this.updateQuantity(itemId, -1);
  }

  removeItem(itemId: string): void {
    this.itemsState.update((items) => items.filter((item) => item.id !== itemId));
  }

  clear(): void {
    this.itemsState.set([]);
  }

  private updateQuantity(itemId: string, difference: number): void {
    this.itemsState.update((items) =>
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.min(MAX_ITEM_QUANTITY, Math.max(1, item.quantity + difference)),
            }
          : item,
      ),
    );
  }

  private createCartItem(selection: AddToCartSelection): CartItem {
    const sauces =
      selection.product.sauceOptions?.filter((option) => selection.sauceIds.includes(option.id)) ??
      [];
    const sauceIds = sauces.map((option) => option.id).sort();
    const sauceNames = sauces.map((option) => option.name).sort();
    const additionals =
      selection.product.additionalOptions?.filter((option) =>
        selection.additionalIds.includes(option.id),
      ) ?? [];
    const additionalIds = additionals.map((option) => option.id).sort();
    const additionalNames = additionals.map((option) => option.name).sort();
    const normalizedObservations = selection.observations.trim();
    const id = [
      selection.product.id,
      sauceIds.join(','),
      additionalIds.join(','),
      normalizedObservations,
    ].join('::');

    const includedSauces = selection.product.sauceSelection?.included ?? 0;
    const optionAmount =
      sauces.slice(includedSauces).reduce((total, option) => total + option.price.amount, 0) +
      additionals.reduce((total, option) => total + option.price.amount, 0);
    const unitPrice = selection.product.price
      ? { ...selection.product.price, amount: selection.product.price.amount + optionAmount }
      : null;

    return {
      id,
      productId: selection.product.id,
      productSlug: selection.product.slug,
      productName: selection.product.name,
      imageUrl: selection.product.imageUrl,
      visualLabel: selection.product.visualLabel,
      quantity: Math.min(MAX_ITEM_QUANTITY, Math.max(1, selection.quantity)),
      unitPrice,
      sauceIds,
      sauceNames,
      additionalIds,
      additionalNames,
      observations: normalizedObservations,
    };
  }

  private restoreCart(): readonly CartItem[] {
    if (!this.isBrowser) return [];

    try {
      const rawCart = localStorage.getItem(CART_STORAGE_KEY);
      if (!rawCart) return [];

      const parsedCart: unknown = JSON.parse(rawCart);
      if (!isStoredCart(parsedCart)) {
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
      }

      return parsedCart.items.map((item) => {
        const currentProduct = this.catalog.getProductBySlug(item.productSlug);
        if (!currentProduct) return item;

        const sauces =
          currentProduct.sauceOptions?.filter((option) => item.sauceIds.includes(option.id)) ?? [];
        const additionals =
          currentProduct.additionalOptions?.filter((option) =>
            item.additionalIds.includes(option.id),
          ) ?? [];
        const includedSauces = currentProduct.sauceSelection?.included ?? 0;
        const optionAmount =
          sauces.slice(includedSauces).reduce((total, option) => total + option.price.amount, 0) +
          additionals.reduce((total, option) => total + option.price.amount, 0);
        const unitPrice = currentProduct.price
          ? { ...currentProduct.price, amount: currentProduct.price.amount + optionAmount }
          : null;

        return {
          ...item,
          productId: currentProduct.id,
          productName: currentProduct.name,
          imageUrl: currentProduct.imageUrl,
          visualLabel: currentProduct.visualLabel,
          unitPrice,
          sauceNames: sauces.map((option) => option.name).sort(),
          additionalNames: additionals.map((option) => option.name).sort(),
        };
      });
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  }
}

function isStoredCart(value: unknown): value is StoredCart {
  return (
    isRecord(value) &&
    value['version'] === CART_STORAGE_VERSION &&
    Array.isArray(value['items']) &&
    value['items'].every(isCartItem)
  );
}

function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    typeof value['id'] === 'string' &&
    typeof value['productId'] === 'string' &&
    typeof value['productSlug'] === 'string' &&
    typeof value['productName'] === 'string' &&
    (typeof value['imageUrl'] === 'string' || value['imageUrl'] === null) &&
    typeof value['visualLabel'] === 'string' &&
    Number.isInteger(value['quantity']) &&
    Number(value['quantity']) >= 1 &&
    Number(value['quantity']) <= MAX_ITEM_QUANTITY &&
    isProductPrice(value['unitPrice']) &&
    Array.isArray(value['sauceIds']) &&
    value['sauceIds'].every((id: unknown) => typeof id === 'string') &&
    Array.isArray(value['sauceNames']) &&
    value['sauceNames'].every((name: unknown) => typeof name === 'string') &&
    Array.isArray(value['additionalIds']) &&
    value['additionalIds'].every((id: unknown) => typeof id === 'string') &&
    Array.isArray(value['additionalNames']) &&
    value['additionalNames'].every((name: unknown) => typeof name === 'string') &&
    typeof value['observations'] === 'string'
  );
}

function isProductPrice(value: unknown): value is ProductPrice | null {
  return (
    value === null ||
    (isRecord(value) &&
      typeof value['amount'] === 'number' &&
      Number.isFinite(value['amount']) &&
      value['amount'] >= 0 &&
      value['currency'] === 'BOB' &&
      typeof value['isMock'] === 'boolean')
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
