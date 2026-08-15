import { Injectable } from '@angular/core';

import { MenuCategory } from '../models/menu-category.model';
import { Product } from '../models/product.model';
import { CatalogStoreService } from './catalog-store.service';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private readonly catalogStore: CatalogStoreService) {}

  getCategories(): readonly MenuCategory[] {
    return this.catalogStore.snapshot().categories;
  }

  getProducts(): readonly Product[] {
    return this.catalogStore.snapshot().products;
  }

  getFeaturedProducts(): readonly Product[] {
    return this.getProducts().filter((product) => product.featured);
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((product) => product.slug === slug);
  }
}
