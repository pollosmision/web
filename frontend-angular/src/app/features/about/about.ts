import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-about',
  imports: [PageContainer, RouterLink],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly business = BUSINESS_CONFIG;
}
