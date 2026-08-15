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
  protected readonly socialLinks = [
    {
      name: 'Instagram',
      label: 'Instagram',
      url: BUSINESS_CONFIG.socialUrls.instagram,
    },
    {
      name: 'TikTok',
      label: 'TikTok',
      url: BUSINESS_CONFIG.socialUrls.tiktok,
    },
    { name: 'Facebook', label: 'Facebook', url: BUSINESS_CONFIG.socialUrls.facebook },
  ] as const;
}
