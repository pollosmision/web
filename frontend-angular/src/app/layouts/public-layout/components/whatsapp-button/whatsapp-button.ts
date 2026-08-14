import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BUSINESS_CONFIG } from '../../../../core/config/business.config';

const WHATSAPP_MESSAGE = 'Hola Pollos Misión 👋 Quiero realizar un pedido.';

@Component({
  selector: 'pm-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappButton {
  protected readonly whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.phones[0].international}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
