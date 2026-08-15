import { Injectable } from '@angular/core';

import { CartItem } from '../models/cart-item.model';

export interface OrderSummaryData {
  readonly orderName: string;
  readonly items: readonly CartItem[];
  readonly totalUnits: number;
  readonly subtotal: number | null;
  readonly createdAt: string;
}

const CANVAS_WIDTH = 760;
const SIDE_PADDING = 48;

@Injectable({ providedIn: 'root' })
export class OrderSummaryImageService {
  async download(data: OrderSummaryData): Promise<void> {
    const itemHeight = data.items.reduce(
      (height, item) =>
        height +
        90 +
        [
          item.sauceNames.length ? item.sauceNames.join(', ') : '',
          item.additionalNames.length ? item.additionalNames.join(', ') : '',
          item.observations,
        ].filter(Boolean).length *
          28,
      0,
    );
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH;
    canvas.height = 580 + itemHeight;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('El navegador no pudo generar la imagen.');

    this.drawBackground(context, canvas.height);
    await this.drawHeader(context, data.orderName);
    const contentEnd = this.drawItems(context, data.items, 330);
    this.drawTotals(context, data, contentEnd + 28);

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
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, CANVAS_WIDTH, height);
    context.strokeStyle = '#111111';
    context.lineWidth = 3;
    context.strokeRect(20, 20, CANVAS_WIDTH - 40, height - 40);
  }

  private async drawHeader(context: CanvasRenderingContext2D, orderName: string): Promise<void> {
    try {
      const logo = await this.loadImage('images/brand/isotipo-pollos-mision.png');
      context.filter = 'grayscale(1) contrast(1.25)';
      context.drawImage(logo, (CANVAS_WIDTH - 130) / 2, 45, 130, 92);
      context.filter = 'none';
    } catch {
      // The text header remains usable if the image cannot be loaded.
    }

    context.textAlign = 'center';
    context.fillStyle = '#111111';
    context.font = '900 38px Arial, sans-serif';
    context.fillText('POLLOS MISIÓN', CANVAS_WIDTH / 2, 176);
    context.font = '700 28px Arial, sans-serif';
    context.fillText('MI PEDIDO', CANVAS_WIDTH / 2, 215);
    context.font = '20px Arial, sans-serif';
    context.fillText('Pendiente de confirmación', CANVAS_WIDTH / 2, 246);
    context.font = '700 21px Arial, sans-serif';
    this.drawTruncatedText(
      context,
      `A NOMBRE DE: ${orderName.toUpperCase()}`,
      CANVAS_WIDTH / 2,
      288,
      CANVAS_WIDTH - SIDE_PADDING * 2,
    );
    context.textAlign = 'left';
  }

  private drawItems(
    context: CanvasRenderingContext2D,
    items: readonly CartItem[],
    initialY: number,
  ): number {
    let y = initialY;

    items.forEach((item, index) => {
      context.fillStyle = '#111111';
      context.font = '700 24px Arial, sans-serif';
      this.drawTruncatedText(
        context,
        `${item.quantity} x ${item.productName}`,
        SIDE_PADDING,
        y,
        460,
      );

      if (item.unitPrice) {
        context.textAlign = 'right';
        context.fillStyle = '#111111';
        context.fillText(
          `Bs ${(item.unitPrice.amount * item.quantity).toFixed(2)}`,
          CANVAS_WIDTH - SIDE_PADDING,
          y,
        );
        context.textAlign = 'left';
      }

      y += 34;
      context.font = '19px Arial, sans-serif';
      context.fillStyle = '#444444';
      if (item.sauceNames.length) {
        this.drawTruncatedText(
          context,
          `Salsas: ${item.sauceNames.join(', ')}`,
          SIDE_PADDING + 18,
          y,
          640,
        );
        y += 28;
      }
      if (item.additionalNames.length) {
        this.drawTruncatedText(
          context,
          `Adicionales: ${item.additionalNames.join(', ')}`,
          SIDE_PADDING + 18,
          y,
          640,
        );
        y += 28;
      }
      if (item.observations) {
        this.drawTruncatedText(
          context,
          `Observaciones: ${item.observations}`,
          SIDE_PADDING + 18,
          y,
          640,
        );
        y += 28;
      }

      y += 22;
      if (index < items.length - 1) {
        this.drawDashedLine(context, y);
        y += 34;
      }
    });

    return y;
  }

  private drawTotals(
    context: CanvasRenderingContext2D,
    data: OrderSummaryData,
    initialY: number,
  ): void {
    this.drawDashedLine(context, initialY);
    context.fillStyle = '#111111';
    context.font = '700 22px Arial, sans-serif';
    context.fillText(`UNIDADES: ${data.totalUnits}`, SIDE_PADDING, initialY + 48);
    context.fillText('SUBTOTAL', SIDE_PADDING, initialY + 92);
    context.textAlign = 'right';
    context.fillStyle = '#111111';
    context.font = '900 28px Arial, sans-serif';
    context.fillText(
      data.subtotal === null ? 'Por confirmar' : `Bs ${data.subtotal.toFixed(2)}`,
      CANVAS_WIDTH - SIDE_PADDING,
      initialY + 92,
    );
    context.textAlign = 'left';
    context.fillStyle = '#444444';
    context.font = '19px Arial, sans-serif';
    context.fillText(data.createdAt, SIDE_PADDING, initialY + 132);

    context.textAlign = 'center';
    context.fillStyle = '#111111';
    context.font = '18px Arial, sans-serif';
    context.fillText(
      'Confirma disponibilidad, total y entrega por WhatsApp.',
      CANVAS_WIDTH / 2,
      initialY + 190,
    );
    context.fillText(
      'Este resumen no es una factura ni comprobante de pago.',
      CANVAS_WIDTH / 2,
      initialY + 222,
    );
    context.textAlign = 'left';
  }

  private drawDashedLine(context: CanvasRenderingContext2D, y: number): void {
    context.save();
    context.strokeStyle = '#777777';
    context.lineWidth = 2;
    context.setLineDash([10, 8]);
    context.beginPath();
    context.moveTo(SIDE_PADDING, y);
    context.lineTo(CANVAS_WIDTH - SIDE_PADDING, y);
    context.stroke();
    context.restore();
  }

  private drawTruncatedText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
  ): void {
    if (context.measureText(text).width <= maxWidth) {
      context.fillText(text, x, y);
      return;
    }

    let shortened = text;
    while (shortened.length && context.measureText(`${shortened}…`).width > maxWidth) {
      shortened = shortened.slice(0, -1);
    }
    context.fillText(`${shortened}…`, x, y);
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
