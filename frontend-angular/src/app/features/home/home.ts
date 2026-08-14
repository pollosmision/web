import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-home',
  imports: [PageContainer],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly business = BUSINESS_CONFIG;
}
