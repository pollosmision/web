import { Injectable } from '@angular/core';

import { CATEGORY_MOCK } from '../data/category.mock';
import { MenuCategory } from '../models/menu-category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  getCategories(): readonly MenuCategory[] {
    return CATEGORY_MOCK;
  }
}
