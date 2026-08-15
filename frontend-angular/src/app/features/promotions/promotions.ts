import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { PromotionService } from '../../core/content/services/promotion.service';
import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-promotions',
  imports: [PageContainer, RouterLink],
  templateUrl: './promotions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Promotions {
  protected readonly promotions = inject(PromotionService).getPromotions();
  protected readonly whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.phones[0].international}?text=${encodeURIComponent('¡Hola, Pollos Misión! Quiero consultar las promociones disponibles.')}`;
}
