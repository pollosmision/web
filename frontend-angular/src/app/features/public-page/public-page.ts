import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-public-page',
  imports: [PageContainer, RouterLink],
  template: `
    <main class="flex min-h-[calc(100dvh-5rem)] items-center py-12">
      <pm-page-container>
        <section
          class="mx-auto max-w-3xl rounded-pm-xl border border-pm-border bg-pm-surface p-8 text-center shadow-pm-md sm:p-12"
        >
          <p class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-pm-orange">
            Pollos Misión
          </p>
          <h1 class="text-4xl font-extrabold tracking-tight text-pm-foreground sm:text-5xl">
            {{ title }}
          </h1>
          <p class="mx-auto mt-5 max-w-xl text-pm-foreground-muted">{{ description }}</p>
          <a
            routerLink="/"
            class="mt-8 inline-flex rounded-full bg-pm-orange px-5 py-3 font-bold text-white hover:bg-pm-red"
          >
            Volver al inicio
          </a>
        </section>
      </pm-page-container>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicPage {
  private readonly routeData = inject(ActivatedRoute).snapshot.data;

  protected readonly title = this.routeData['title'] as string;
  protected readonly description = this.routeData['description'] as string;
}
