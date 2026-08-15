import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/cart/services/cart.service';
import { BUSINESS_CONFIG } from '../../core/config/business.config';
import { PageContainer } from '../../shared/components/page-container/page-container';

@Component({
  selector: 'pm-cart',
  imports: [PageContainer, RouterLink],
  templateUrl: './cart.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  protected readonly cart = inject(CartService);
  protected readonly hasReferencePrices = computed(() =>
    this.cart.items().some((item) => item.unitPrice?.isMock),
  );
  protected readonly whatsappUrl = computed(() => {
    const productLines = this.cart.items().flatMap((item, index) => {
      const lines = [`${index + 1}. ${item.quantity} x ${item.productName}`];

      if (item.sauceName) lines.push(`   Salsa: ${item.sauceName}`);
      if (item.additionalNames.length) {
        lines.push(`   Adicionales: ${item.additionalNames.join(', ')}`);
      }
      if (item.observations) lines.push(`   Observaciones: ${item.observations}`);

      return lines;
    });
    const subtotal = this.cart.subtotal();
    const summary = [
      '¡Hola, Pollos Misión! 👋',
      'Quiero realizar el siguiente pedido:',
      '',
      ...productLines,
      '',
      `Total de unidades: ${this.cart.totalUnits()}`,
      `Subtotal${this.hasReferencePrices() ? ' referencial' : ''}: ${subtotal === null ? 'por confirmar' : `BOB ${subtotal.toFixed(2)}`}`,
      '',
      'Por favor, confirmen la disponibilidad, el total y la modalidad de entrega o recojo. Gracias.',
    ].join('\n');

    return `https://wa.me/${BUSINESS_CONFIG.phones[0].international}?text=${encodeURIComponent(summary)}`;
  });
}
