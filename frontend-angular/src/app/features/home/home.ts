import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { CatalogService } from '../../core/catalog/services/catalog.service';
import { PromotionService } from '../../core/content/services/promotion.service';
import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-home',
  imports: [PageContainer, RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly catalogService = inject(CatalogService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly business = BUSINESS_CONFIG;
  protected readonly mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    BUSINESS_CONFIG.location.mapEmbedUrl,
  );
  protected readonly categories = this.catalogService.getCategories();
  protected readonly featuredProducts = this.catalogService.getFeaturedProducts();
  protected readonly promotions = inject(PromotionService).getPromotions();
}
