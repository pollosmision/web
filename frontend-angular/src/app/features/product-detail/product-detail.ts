import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CatalogService } from '../../core/catalog/services/catalog.service';
import { CartService } from '../../core/cart/services/cart.service';
import { PageContainer } from '../../shared/components/page-container/page-container';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 20;
const MAX_OBSERVATION_LENGTH = 250;

@Component({
  selector: 'pm-product-detail',
  imports: [PageContainer, RouterLink],
  templateUrl: './product-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly catalogService = inject(CatalogService);
  private readonly cartService = inject(CartService);

  protected readonly product = this.catalogService.getProductBySlug(
    this.route.snapshot.paramMap.get('slug') ?? '',
  );
  protected readonly quantity = signal(MIN_QUANTITY);
  protected readonly selectedSauce = signal<string | null>(null);
  protected readonly selectedAdditionals = signal<ReadonlySet<string>>(new Set());
  protected readonly observations = signal('');
  protected readonly confirmationMessage = signal<string | null>(null);
  protected readonly maxObservationLength = MAX_OBSERVATION_LENGTH;

  protected decreaseQuantity(): void {
    this.quantity.update((quantity) => Math.max(MIN_QUANTITY, quantity - 1));
  }

  protected increaseQuantity(): void {
    this.quantity.update((quantity) => Math.min(MAX_QUANTITY, quantity + 1));
  }

  protected selectSauce(sauceId: string): void {
    this.selectedSauce.set(sauceId);
  }

  protected toggleAdditional(additionalId: string): void {
    this.selectedAdditionals.update((selected) => {
      const nextSelection = new Set(selected);
      if (nextSelection.has(additionalId)) {
        nextSelection.delete(additionalId);
      } else {
        nextSelection.add(additionalId);
      }
      return nextSelection;
    });
  }

  protected updateObservations(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.observations.set(input.value.slice(0, MAX_OBSERVATION_LENGTH));
  }

  protected prepareOrder(): void {
    if (!this.product) return;

    const sauceName =
      this.product.sauceOptions?.find((sauce) => sauce.id === this.selectedSauce())?.name ?? null;
    const additionalNames =
      this.product.additionalOptions
        ?.filter((additional) => this.selectedAdditionals().has(additional.id))
        .map((additional) => additional.name) ?? [];

    this.cartService.addItem({
      product: this.product,
      quantity: this.quantity(),
      sauceName,
      additionalNames,
      observations: this.observations(),
    });
    this.confirmationMessage.set('Producto agregado al pedido correctamente.');
  }
}
