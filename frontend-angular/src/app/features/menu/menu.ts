import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { CatalogService } from '../../core/catalog/services/catalog.service';
import { PageContainer } from '../../shared/components/page-container/page-container';
import { ProductCard } from './components/product-card/product-card';

const ALL_CATEGORIES = 'all';

@Component({
  selector: 'pm-menu',
  imports: [PageContainer, ProductCard],
  templateUrl: './menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  private readonly catalogService = inject(CatalogService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly categories = this.catalogService.getCategories();
  protected readonly products = this.catalogService.getProducts();
  protected readonly activeCategory = signal(ALL_CATEGORIES);
  private readonly categoryButtons = viewChildren<ElementRef<HTMLButtonElement>>('categoryButton');
  protected readonly filteredProducts = computed(() => {
    const category = this.activeCategory();
    return category === ALL_CATEGORIES
      ? this.products
      : this.products.filter((product) => product.categorySlug === category);
  });

  constructor() {
    effect(() => {
      const activeCategory = this.activeCategory();
      const activeButton = this.categoryButtons().find(
        (button) => button.nativeElement.dataset['category'] === activeCategory,
      );

      if (activeButton) {
        queueMicrotask(() =>
          activeButton.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          }),
        );
      }
    });

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const requestedCategory = params.get('categoria');
      const isValidCategory = this.categories.some(
        (category) => category.slug === requestedCategory,
      );

      this.activeCategory.set(
        isValidCategory && requestedCategory ? requestedCategory : ALL_CATEGORIES,
      );

      if (requestedCategory && !isValidCategory) {
        void this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { categoria: null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      }
    });
  }

  protected selectCategory(category: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoria: category === ALL_CATEGORIES ? null : category },
      queryParamsHandling: 'merge',
    });
  }
}
