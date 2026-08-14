import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BUSINESS_CONFIG } from '../../../../core/config/business.config';
import { PageContainer } from '../../../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-footer',
  imports: [PageContainer, RouterLink],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly business = BUSINESS_CONFIG;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly instagramUrl = `https://www.instagram.com/${BUSINESS_CONFIG.socialHandles.instagram}`;
}
