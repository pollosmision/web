import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';

@Component({
  selector: 'pm-public-layout',
  imports: [Header, RouterOutlet],
  template: `
    <div class="min-h-dvh bg-pm-background text-pm-foreground">
      <pm-header />
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {}
