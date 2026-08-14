import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const DEFAULT_DESCRIPTION =
  'Pollos Misión: pollo frito crocante, papas, alitas y comida rápida en La Paz, Bolivia.';
const DEFAULT_ROBOTS = 'index, follow';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  initialize(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() =>
        this.updateMetadata(this.deepestRoute(this.router.routerState.snapshot.root)),
      );
  }

  private updateMetadata(route: ActivatedRouteSnapshot): void {
    const pageTitle = route.title ?? 'Pollos Misión';
    const description =
      typeof route.data['description'] === 'string'
        ? route.data['description']
        : DEFAULT_DESCRIPTION;
    const robots = typeof route.data['robots'] === 'string' ? route.data['robots'] : DEFAULT_ROBOTS;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Pollos Misión' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_BO' });
  }

  private deepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let currentRoute = route;
    while (currentRoute.firstChild) currentRoute = currentRoute.firstChild;
    return currentRoute;
  }
}
