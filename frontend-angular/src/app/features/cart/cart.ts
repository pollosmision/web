import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartService } from '../../core/cart/services/cart.service';
import { OrderSummaryImageService } from '../../core/cart/services/order-summary-image.service';
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
  private readonly orderSummaryImage = inject(OrderSummaryImageService);
  protected readonly orderName = signal('');
  protected readonly orderNameError = signal<string | null>(null);
  protected readonly isSummaryOpen = signal(false);
  protected readonly summaryDate = signal('');
  protected readonly isDownloading = signal(false);
  protected readonly downloadError = signal<string | null>(null);
  protected readonly whatsappMessage = computed(() => {
    const productLines = this.cart.items().flatMap((item, index) => {
      const lines = [`${index + 1}. ${item.quantity} x ${item.productName}`];

      if (item.sauceNames.length) lines.push(`   Salsas: ${item.sauceNames.join(', ')}`);
      if (item.additionalNames.length) {
        lines.push(`   Adicionales: ${item.additionalNames.join(', ')}`);
      }
      if (item.observations) lines.push(`   Observaciones: ${item.observations}`);

      return lines;
    });
    const subtotal = this.cart.subtotal();
    return [
      '¡Hola, Pollos Misión! 👋',
      `Pedido a nombre de: ${this.orderName().trim() || 'por indicar'}`,
      'Quiero realizar el siguiente pedido:',
      '',
      ...productLines,
      '',
      `Total de unidades: ${this.cart.totalUnits()}`,
      `Subtotal: ${subtotal === null ? 'por confirmar' : `BOB ${subtotal.toFixed(2)}`}`,
      '',
      'Por favor, confirmen la disponibilidad, el total y la modalidad de entrega o recojo. Gracias.',
    ].join('\n');
  });
  protected readonly whatsappUrl = computed(
    () =>
      `https://wa.me/${BUSINESS_CONFIG.phones[0].international}?text=${encodeURIComponent(this.whatsappMessage())}`,
  );

  protected openSummary(): void {
    if (!this.validateOrderName()) return;

    this.summaryDate.set(
      new Intl.DateTimeFormat('es-BO', { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(),
      ),
    );
    this.downloadError.set(null);
    this.isSummaryOpen.set(true);
  }

  protected closeSummary(): void {
    this.isSummaryOpen.set(false);
  }

  protected async downloadSummary(): Promise<void> {
    this.isDownloading.set(true);
    this.downloadError.set(null);

    try {
      await this.orderSummaryImage.download({
        orderName: this.orderName().trim(),
        items: this.cart.items(),
        totalUnits: this.cart.totalUnits(),
        subtotal: this.cart.subtotal(),
        createdAt: this.summaryDate(),
      });
    } catch {
      this.downloadError.set('No se pudo descargar la imagen. Intenta nuevamente.');
    } finally {
      this.isDownloading.set(false);
    }
  }

  protected updateOrderName(event: Event): void {
    this.orderName.set((event.target as HTMLInputElement).value);
    if (this.orderNameError()) this.orderNameError.set(null);
  }

  protected sendWhatsapp(): void {
    if (!this.validateOrderName()) return;
    window.open(this.whatsappUrl(), '_blank', 'noopener,noreferrer');
  }

  @HostListener('document:keydown.escape')
  protected closeSummaryWithKeyboard(): void {
    if (this.isSummaryOpen()) this.closeSummary();
  }

  private validateOrderName(): boolean {
    if (this.orderName().trim().length >= 2) return true;

    this.orderNameError.set('Ingresa el nombre para identificar tu pedido.');
    return false;
  }
}
