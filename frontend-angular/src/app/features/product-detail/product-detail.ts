import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CatalogService } from '../../core/catalog/services/catalog.service';
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
    this.confirmationMessage.set(
      'Selección preparada. El carrito se conectará en el siguiente paso del desarrollo.',
    );
  }
}
