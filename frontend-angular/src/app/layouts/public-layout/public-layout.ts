import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'pm-public-layout',
  imports: [Footer, Header, RouterOutlet, WhatsappButton],
  template: `
    <div class="min-h-dvh bg-pm-background text-pm-foreground">
      <a
        href="#main-content"
        class="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-pm-red px-5 py-3 font-black text-white shadow-pm-md focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <pm-header />
      <div id="main-content">
        <router-outlet (activate)="focusPageHeading()" />
      </div>
      <pm-footer />
      <pm-whatsapp-button />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {
  private readonly document = inject(DOCUMENT);

  protected focusPageHeading(): void {
    queueMicrotask(() => {
      const heading = this.document.querySelector<HTMLElement>('#main-content h1');
      if (!heading) return;

      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
  }
}
