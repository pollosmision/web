import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { CatalogService } from '../../core/catalog/services/catalog.service';
import { PageContainer } from '../../shared/components/page-container/page-container';
import { PromotionService } from './services/promotion.service';

@Component({
  selector: 'pm-home',
  imports: [PageContainer, RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly catalogService = inject(CatalogService);

  protected readonly business = BUSINESS_CONFIG;
  protected readonly categories = this.catalogService.getCategories();
  protected readonly featuredProducts = this.catalogService.getFeaturedProducts();
  protected readonly promotions = inject(PromotionService).getPromotions();
}
