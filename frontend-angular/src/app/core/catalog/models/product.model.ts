export type ProductAvailability = 'available' | 'unavailable' | 'pending-confirmation';

export interface ProductPrice {
  readonly amount: number;
  readonly currency: 'BOB';
  readonly isMock: boolean;
}

export interface ProductOption {
  readonly id: string;
  readonly name: string;
}

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly categorySlug: string;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string | null;
  readonly imageAlt: string;
  readonly visualLabel: string;
  readonly featured: boolean;
  readonly availability: ProductAvailability;
  readonly price: ProductPrice | null;
  readonly sauceOptions?: readonly ProductOption[];
  readonly additionalOptions?: readonly ProductOption[];
}
