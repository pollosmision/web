import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/cart/services/cart.service';
import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-cart',
  imports: [PageContainer, RouterLink],
  templateUrl: './cart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  protected readonly cart = inject(CartService);
}
