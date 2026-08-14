import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-not-found',
  imports: [PageContainer, RouterLink],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
