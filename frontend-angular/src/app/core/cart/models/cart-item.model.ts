import { Product, ProductPrice } from '../../catalog/models/product.model';

export interface AddToCartSelection {
  readonly product: Product;
  readonly quantity: number;
  readonly sauceIds: readonly string[];
  readonly additionalIds: readonly string[];
  readonly observations: string;
}

export interface CartItem {
  readonly id: string;
  readonly productId: string;
  readonly productSlug: string;
  readonly productName: string;
  readonly imageUrl: string | null;
  readonly visualLabel: string;
  readonly quantity: number;
  readonly unitPrice: ProductPrice | null;
  readonly sauceIds: readonly string[];
  readonly sauceNames: readonly string[];
  readonly additionalIds: readonly string[];
  readonly additionalNames: readonly string[];
  readonly observations: string;
}
