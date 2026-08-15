import { Injectable } from '@angular/core';

import { CatalogStoreService } from '../../catalog/services/catalog-store.service';
import { Promotion } from '../models/promotion.model';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  constructor(private readonly catalogStore: CatalogStoreService) {}

  getPromotions(): readonly Promotion[] {
    return this.catalogStore.snapshot().promotions;
  }
}
