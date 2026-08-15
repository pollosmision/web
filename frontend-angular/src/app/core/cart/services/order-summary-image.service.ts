import { Injectable } from '@angular/core';

import { CartItem } from '../models/cart-item.model';

export interface OrderSummaryData {
  readonly items: readonly CartItem[];
  readonly totalUnits: number;
  readonly subtotal: number | null;
  readonly createdAt: string;
  readonly hasReferencePrices: boolean;
}

const CANVAS_WIDTH = 1080;
const SIDE_PADDING = 72;

@Injectable({ providedIn: 'root' })
export class OrderSummaryImageService {
  async download(data: OrderSummaryData): Promise<void> {
    const itemHeight = data.items.reduce(
      (height, item) =>
        height +
        105 +
        [
          item.sauceName,
          item.additionalNames.length ? item.additionalNames.join(', ') : '',
          item.observations,
        ].filter(Boolean).length *
          32,
      0,
    );
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = 650 + itemHeight;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('El navegador no pudo generar la imagen.');

    this.drawBackground(context, canvas.height);
    await this.drawHeader(context);
    const contentEnd = this.drawItems(context, data.items, 280);
    this.drawTotals(context, data, contentEnd + 36);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => {
        if (result) resolve(result);
        else reject(new Error('No se pudo preparar la descarga.'));
      }, 'image/png');
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mi-pedido-pollos-mision.png';
    link.click();
    URL.revokeObjectURL(url);
  }

  private drawBackground(context: CanvasRenderingContext2D, height: number): void {
    context.fillStyle = '#fffaf0';
    context.fillRect(0, 0, CANVAS_WIDTH, height);
    context.fillStyle = '#1a1a1a';
    context.fillRect(0, 0, CANVAS_WIDTH, 230);
    context.fillStyle = '#cc0000';
    context.fillRect(0, 220, CANVAS_WIDTH, 10);
  }

  private async drawHeader(context: CanvasRenderingContext2D): Promise<void> {
    try {
      const logo = await this.loadImage('/images/brand/isotipo-pollos-mision.png');
      context.drawImage(logo, SIDE_PADDING, 54, 140, 100);
    } catch {
      // The text header remains usable if the image cannot be loaded.
    }

    context.fillStyle = '#ffffff';
    context.font = '900 52px Arial, sans-serif';
    context.fillText('MI PEDIDO', 250, 105);
    context.fillStyle = '#ffcc00';
    context.font = '700 28px Arial, sans-serif';
    context.fillText('POLLOS MISIÓN', 250, 150);
    context.fillStyle = 'rgba(255,255,255,0.68)';
    context.font = '24px Arial, sans-serif';
    context.fillText('Resumen pendiente de confirmación', 250, 188);
  }

  private drawItems(
    context: CanvasRenderingContext2D,
    items: readonly CartItem[],
    initialY: number,
  ): number {
    let y = initialY;

    items.forEach((item, index) => {
      context.fillStyle = '#333333';
      context.font = '700 30px Arial, sans-serif';
      context.fillText(`${item.quantity} × ${item.productName}`, SIDE_PADDING, y);

      if (item.unitPrice) {
        context.textAlign = 'right';
        context.fillStyle = '#990000';
        context.fillText(
          `Bs ${(item.unitPrice.amount * item.quantity).toFixed(2)}`,
          CANVAS_WIDTH - SIDE_PADDING,
          y,
        );
        context.textAlign = 'left';
      }

      y += 42;
      context.font = '24px Arial, sans-serif';
      context.fillStyle = '#666666';
      if (item.sauceName) {
        context.fillText(`Salsa: ${item.sauceName}`, SIDE_PADDING + 24, y);
        y += 32;
      }
      if (item.additionalNames.length) {
        context.fillText(`Adicionales: ${item.additionalNames.join(', ')}`, SIDE_PADDING + 24, y);
        y += 32;
      }
      if (item.observations) {
        context.fillText(`Observaciones: ${item.observations}`, SIDE_PADDING + 24, y);
        y += 32;
      }

      y += 28;
      if (index < items.length - 1) {
        context.strokeStyle = '#eadfcf';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(SIDE_PADDING, y);
        context.lineTo(CANVAS_WIDTH - SIDE_PADDING, y);
        context.stroke();
        y += 48;
      }
    });

    return y;
  }

  private drawTotals(
    context: CanvasRenderingContext2D,
    data: OrderSummaryData,
    initialY: number,
  ): void {
    context.fillStyle = '#fff5cc';
    context.roundRect(SIDE_PADDING, initialY, CANVAS_WIDTH - SIDE_PADDING * 2, 190, 24);
    context.fill();

    context.fillStyle = '#333333';
    context.font = '700 27px Arial, sans-serif';
    context.fillText(`Total de unidades: ${data.totalUnits}`, SIDE_PADDING + 32, initialY + 55);
    context.fillText(
      `Subtotal${data.hasReferencePrices ? ' referencial' : ''}:`,
      SIDE_PADDING + 32,
      initialY + 105,
    );
    context.textAlign = 'right';
    context.fillStyle = '#990000';
    context.font = '900 34px Arial, sans-serif';
    context.fillText(
      data.subtotal === null ? 'Por confirmar' : `Bs ${data.subtotal.toFixed(2)}`,
      CANVAS_WIDTH - SIDE_PADDING - 32,
      initialY + 105,
    );
    context.textAlign = 'left';
    context.fillStyle = '#666666';
    context.font = '22px Arial, sans-serif';
    context.fillText(data.createdAt, SIDE_PADDING + 32, initialY + 152);

    context.fillStyle = '#333333';
    context.font = '700 24px Arial, sans-serif';
    context.fillText(
      'Confirma disponibilidad, total y entrega por WhatsApp.',
      SIDE_PADDING,
      initialY + 250,
    );
  }

  private loadImage(source: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('No se pudo cargar el logo.'));
      image.src = source;
    });
  }
}
