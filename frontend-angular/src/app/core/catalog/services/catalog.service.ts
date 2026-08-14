import { Injectable } from '@angular/core';

import { CATEGORY_MOCK } from '../data/category.mock';
import { PRODUCT_MOCK } from '../data/product.mock';
import { MenuCategory } from '../models/menu-category.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  getCategories(): readonly MenuCategory[] {
    return CATEGORY_MOCK;
  }

  getProducts(): readonly Product[] {
    return PRODUCT_MOCK;
  }

  getFeaturedProducts(): readonly Product[] {
    return PRODUCT_MOCK.filter((product) => product.featured);
  }
}
