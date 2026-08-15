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
      sauceIds: [],
      additionalIds: [],
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
      sauceIds: [],
      additionalIds: [],
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
      sauceIds: [],
      additionalIds: [],
      observations: '',
    });

    expect(service.subtotal()).toBeNull();
  });

  it('adds sauce and additional prices to each product unit', () => {
    const service = TestBed.inject(CartService);
    const pricedProduct: Product = {
      ...PRODUCT,
      price: { amount: 20, currency: 'BOB', isMock: false },
      sauceOptions: [
        {
          id: 'bbq',
          name: 'BBQ',
          price: { amount: 2, currency: 'BOB', isMock: false },
        },
      ],
      additionalOptions: [
        {
          id: 'extra-papas',
          name: 'Porción adicional de papas',
          price: { amount: 10, currency: 'BOB', isMock: false },
        },
        {
          id: 'extra-arroz',
          name: 'Porción adicional de arroz',
          price: { amount: 5, currency: 'BOB', isMock: false },
        },
      ],
    };

    service.addItem({
      product: pricedProduct,
      quantity: 2,
      sauceIds: ['bbq'],
      additionalIds: ['extra-papas', 'extra-arroz'],
      observations: '',
    });

    expect(service.items()[0]?.unitPrice?.amount).toBe(37);
    expect(service.subtotal()).toBe(74);
  });

  it('does not charge the two sauces included with wings and fingers', () => {
    const service = TestBed.inject(CartService);
    const wings: Product = {
      ...PRODUCT,
      price: { amount: 22, currency: 'BOB', isMock: false },
      sauceOptions: [
        { id: 'bbq', name: 'BBQ', price: { amount: 2, currency: 'BOB', isMock: false } },
        {
          id: 'buffalo',
          name: 'Búfalo',
          price: { amount: 2, currency: 'BOB', isMock: false },
        },
      ],
      sauceSelection: { minimum: 2, maximum: 2, included: 2 },
    };

    service.addItem({
      product: wings,
      quantity: 1,
      sauceIds: ['bbq', 'buffalo'],
      additionalIds: [],
      observations: '',
    });

    expect(service.items()[0]?.unitPrice?.amount).toBe(22);
    expect(service.subtotal()).toBe(22);
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
        version: 3,
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
            sauceIds: [],
            sauceNames: [],
            additionalIds: [],
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

  it('refreshes a stored price from the current catalog', () => {
    localStorage.setItem(
      'pollos-mision-cart',
      JSON.stringify({
        version: 3,
        items: [
          {
            id: 'broaster-clasico::::::',
            productId: 'broaster-clasico',
            productSlug: 'broaster-clasico',
            productName: 'Nombre anterior',
            imageUrl: null,
            visualLabel: 'XX',
            quantity: 2,
            unitPrice: null,
            sauceIds: [],
            sauceNames: [],
            additionalIds: [],
            additionalNames: [],
            observations: '',
          },
        ],
      }),
    );

    const service = TestBed.inject(CartService);

    expect(service.items()[0]?.productName).toBe('Broaster Clásico');
    expect(service.items()[0]?.unitPrice?.amount).toBe(20);
    expect(service.subtotal()).toBe(40);
  });
});
