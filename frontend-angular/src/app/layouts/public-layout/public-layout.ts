import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'pm-public-layout',
  imports: [Footer, Header, RouterOutlet, WhatsappButton],
  template: `
    <div class="min-h-dvh bg-pm-background text-pm-foreground">
      <pm-header />
      <router-outlet />
      <pm-footer />
      <pm-whatsapp-button />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {}
