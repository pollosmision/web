import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { PageContainer } from '../../shared/components/page-container/page-container';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'pm-home',
  imports: [PageContainer, RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly business = BUSINESS_CONFIG;
  protected readonly categories = inject(CategoryService).getCategories();
}
