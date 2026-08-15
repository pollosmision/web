import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CatalogService } from '../../core/catalog/services/catalog.service';
import { CartService } from '../../core/cart/services/cart.service';
import { PageContainer } from '../../shared/components/page-container/page-container';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 20;
const MAX_OBSERVATION_LENGTH = 250;

@Component({
  selector: 'pm-product-detail',
  imports: [PageContainer, RouterLink],
  templateUrl: './product-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly catalogService = inject(CatalogService);
  private readonly cartService = inject(CartService);

  protected readonly product = this.catalogService.getProductBySlug(
    this.route.snapshot.paramMap.get('slug') ?? '',
  );
  protected readonly quantity = signal(MIN_QUANTITY);
  protected readonly selectedSauces = signal<ReadonlySet<string>>(new Set());
  protected readonly selectedAdditionals = signal<ReadonlySet<string>>(new Set());
  protected readonly observations = signal('');
  protected readonly confirmationMessage = signal<string | null>(null);
  protected readonly sauceError = signal<string | null>(null);
  protected readonly maxObservationLength = MAX_OBSERVATION_LENGTH;
  protected readonly selectedUnitPrice = computed(() => {
    if (!this.product?.price) return null;

    const selectedSauceOptions =
      this.product.sauceOptions?.filter((option) => this.selectedSauces().has(option.id)) ?? [];
    const includedSauces = this.product.sauceSelection?.included ?? 0;
    const sauceAmount = selectedSauceOptions
      .slice(includedSauces)
      .reduce((total, option) => total + option.price.amount, 0);
    const additionalAmount =
      this.product.additionalOptions
        ?.filter((option) => this.selectedAdditionals().has(option.id))
        .reduce((total, option) => total + option.price.amount, 0) ?? 0;

    return this.product.price.amount + sauceAmount + additionalAmount;
  });
  protected readonly selectionTotal = computed(() => {
    const unitPrice = this.selectedUnitPrice();
    return unitPrice === null ? null : unitPrice * this.quantity();
  });

  protected decreaseQuantity(): void {
    this.quantity.update((quantity) => Math.max(MIN_QUANTITY, quantity - 1));
  }

  protected increaseQuantity(): void {
    this.quantity.update((quantity) => Math.min(MAX_QUANTITY, quantity + 1));
  }

  protected toggleSauce(sauceId: string): void {
    const maximum = this.product?.sauceSelection?.maximum ?? 1;
    this.selectedSauces.update((selected) => {
      const nextSelection = new Set(selected);
      if (nextSelection.has(sauceId)) {
        nextSelection.delete(sauceId);
      } else if (nextSelection.size < maximum) {
        nextSelection.add(sauceId);
      }
      return nextSelection;
    });
    this.sauceError.set(null);
  }

  protected toggleAdditional(additionalId: string): void {
    this.selectedAdditionals.update((selected) => {
      const nextSelection = new Set(selected);
      if (nextSelection.has(additionalId)) {
        nextSelection.delete(additionalId);
      } else {
        nextSelection.add(additionalId);
      }
      return nextSelection;
    });
  }

  protected updateObservations(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.observations.set(input.value.slice(0, MAX_OBSERVATION_LENGTH));
  }

  protected prepareOrder(): void {
    if (!this.product) return;

    const sauceRule = this.product.sauceSelection;
    if (sauceRule && this.selectedSauces().size < sauceRule.minimum) {
      this.sauceError.set(
        `Debes elegir ${sauceRule.minimum} salsas para agregar este producto al pedido.`,
      );
      return;
    }

    this.cartService.addItem({
      product: this.product,
      quantity: this.quantity(),
      sauceIds: [...this.selectedSauces()],
      additionalIds: [...this.selectedAdditionals()],
      observations: this.observations(),
    });
    this.confirmationMessage.set('Producto agregado al pedido correctamente.');
  }
}
