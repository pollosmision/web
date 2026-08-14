import { TestBed } from '@angular/core/testing';

import { Product } from '../../catalog/models/product.model';
import { CartService } from './cart.service';

const PRODUCT: Product = {
  id: 'test-product',
  slug: 'test-product',
  categorySlug: 'pollo-broaster',
  name: 'Producto de prueba',
  description: 'Producto usado exclusivamente por las pruebas.',
  imageUrl: null,
  imageAlt: 'Imagen de prueba',
  visualLabel: 'TP',
  featured: false,
  availability: 'pending-confirmation',
  price: null,
};

describe('CartService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  afterEach(() => localStorage.clear());

  it('adds equal selections as one line and accumulates their quantity', () => {
    const service = TestBed.inject(CartService);
    const selection = {
      product: PRODUCT,
      quantity: 2,
      sauceName: 'Llajua',
      additionalNames: ['Porción de papas'],
      observations: '',
    };

    service.addItem(selection);
    service.addItem({ ...selection, quantity: 1 });

    expect(service.items()).toHaveLength(1);
    expect(service.totalUnits()).toBe(3);
    expect(service.items()[0]?.quantity).toBe(3);
  });

  it('decreases quantity and removes the line when it reaches zero', () => {
    const service = TestBed.inject(CartService);
    service.addItem({
      product: PRODUCT,
      quantity: 2,
      sauceName: null,
      additionalNames: [],
      observations: '',
    });
    const itemId = service.items()[0]?.id;
    expect(itemId).toBeDefined();

    service.decreaseQuantity(itemId!);
    expect(service.totalUnits()).toBe(1);
    service.decreaseQuantity(itemId!);
    expect(service.items()).toHaveLength(0);
  });

  it('keeps subtotal pending when an item has no confirmed price', () => {
    const service = TestBed.inject(CartService);
    service.addItem({
      product: PRODUCT,
      quantity: 1,
      sauceName: null,
      additionalNames: [],
      observations: '',
    });

    expect(service.subtotal()).toBeNull();
  });

  it('restores safely when localStorage contains invalid data', () => {
    localStorage.setItem('pollos-mision-cart', '{invalid-json');

    const service = TestBed.inject(CartService);

    expect(service.items()).toEqual([]);
    expect(service.totalUnits()).toBe(0);
  });

  it('restores a valid versioned cart from localStorage', () => {
    localStorage.setItem(
      'pollos-mision-cart',
      JSON.stringify({
        version: 1,
        items: [
          {
            id: 'test-product::::::',
            productId: PRODUCT.id,
            productSlug: PRODUCT.slug,
            productName: PRODUCT.name,
            imageUrl: null,
            visualLabel: PRODUCT.visualLabel,
            quantity: 2,
            unitPrice: null,
            sauceName: null,
            additionalNames: [],
            observations: '',
          },
        ],
      }),
    );

    const service = TestBed.inject(CartService);

    expect(service.items()).toHaveLength(1);
    expect(service.totalUnits()).toBe(2);
  });
});
