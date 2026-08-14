import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pm-page-container',
  host: { class: 'block w-full' },
  template: `
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContainer {}
