import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-location',
  imports: [PageContainer],
  templateUrl: './location.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Location {
  protected readonly business = BUSINESS_CONFIG;
}
