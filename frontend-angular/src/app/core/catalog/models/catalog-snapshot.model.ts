import { Promotion } from '../../content/models/promotion.model';
import { MenuCategory } from './menu-category.model';
import { Product } from './product.model';

export interface CatalogSnapshot {
  readonly categories: readonly MenuCategory[];
  readonly products: readonly Product[];
  readonly promotions: readonly Promotion[];
}
