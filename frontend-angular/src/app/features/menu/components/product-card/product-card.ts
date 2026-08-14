import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product, ProductAvailability } from '../../../../core/catalog/models/product.model';

const AVAILABILITY_LABELS: Readonly<Record<ProductAvailability, string>> = {
  available: 'Disponible',
  unavailable: 'No disponible',
  'pending-confirmation': 'Disponibilidad por confirmar',
};

@Component({
  selector: 'pm-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<Product>();
  protected readonly availabilityLabels = AVAILABILITY_LABELS;
}
