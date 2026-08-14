import { Injectable } from '@angular/core';

import { PROMOTION_MOCK } from '../data/promotion.mock';
import { Promotion } from '../models/promotion.model';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  getPromotions(): readonly Promotion[] {
    return PROMOTION_MOCK;
  }
}
