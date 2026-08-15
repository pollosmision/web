import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PageContainer } from '../../shared/components/page-container/page-container';

interface LegalSection {
  readonly title: string;
  readonly paragraphs?: readonly string[];
  readonly items?: readonly string[];
}

interface LegalContent {
  readonly introduction: string;
  readonly sections: readonly LegalSection[];
}

const LEGAL_CONTENT: Readonly<Record<string, LegalContent>> = {
  terms: {
    introduction:
      'Estos términos regulan el uso del sitio web de Pollos Misión. Al navegar por el sitio aceptas las condiciones descritas a continuación.',
    sections: [
      {
        title: '1. Información del sitio',
        paragraphs: [
          'Este sitio presenta información sobre Pollos Misión, su menú, promociones, ubicación y canales de contacto en La Paz, Bolivia.',
          'Procuramos mantener la información actualizada, pero la disponibilidad, presentación, porciones, precios y vigencia de las promociones pueden cambiar. La confirmación proporcionada por Pollos Misión al realizar el pedido será la información aplicable.',
        ],
      },
      {
        title: '2. Carrito y pedidos',
        paragraphs: [
          'Agregar productos al carrito no reserva productos ni constituye una compra o un pedido confirmado. El carrito es una herramienta para preparar una selección dentro del navegador.',
          'Cuando el pedido se gestione mediante WhatsApp, sus productos, precio final, disponibilidad, modalidad de entrega o recojo y demás detalles deberán ser confirmados directamente con Pollos Misión.',
        ],
      },
      {
        title: '3. Productos y consideraciones alimentarias',
        paragraphs: [
          'Las fotografías son referenciales y el producto servido puede presentar variaciones. Si tienes alergias, intolerancias o restricciones alimentarias, comunícalas antes de confirmar tu pedido. No debes asumir que un producto está libre de alérgenos por su descripción o fotografía.',
        ],
      },
      {
        title: '4. Uso permitido',
        items: [
          'Usar el sitio de forma lícita y sin afectar su funcionamiento o seguridad.',
          'No intentar acceder sin autorización a sistemas, datos o áreas restringidas.',
          'No copiar ni utilizar la identidad, fotografías, textos o materiales de Pollos Misión con fines comerciales sin autorización.',
        ],
      },
      {
        title: '5. Servicios y enlaces externos',
        paragraphs: [
          'El sitio puede enlazar a WhatsApp, Instagram, TikTok y Facebook. Al abrir esos enlaces, el uso de cada plataforma se rige por sus propios términos y políticas, que no son controlados por Pollos Misión.',
        ],
      },
      {
        title: '6. Cambios y contacto',
        paragraphs: [
          'Podemos actualizar el sitio y estos términos cuando sea necesario. La versión publicada será la vigente. Para consultas puedes comunicarte a los teléfonos 77632194 o 60514138.',
          'Estos términos se interpretan conforme a la normativa aplicable del Estado Plurinacional de Bolivia.',
        ],
      },
    ],
  },
  privacy: {
    introduction:
      'Esta política explica qué información utiliza el sitio web de Pollos Misión y cómo puedes administrar los datos guardados en tu dispositivo.',
    sections: [
      {
        title: '1. Información que utiliza este sitio',
        paragraphs: [
          'Actualmente el sitio no incluye formularios de registro, cuentas de usuario, pagos en línea ni herramientas propias de analítica. No solicitamos datos personales directamente durante la navegación.',
          'Para que ciertas funciones operen, el navegador guarda localmente los productos de tu carrito y tu preferencia de tema visual. Esta información permanece en tu dispositivo y no identifica por sí sola a una persona.',
        ],
      },
      {
        title: '2. Almacenamiento local',
        items: [
          'pollos-mision-cart: conserva temporalmente los productos seleccionados en el carrito.',
          'pollos-mision-theme: recuerda tu preferencia de tema claro u oscuro.',
        ],
        paragraphs: [
          'Puedes eliminar esta información vaciando el carrito o borrando los datos del sitio desde la configuración de tu navegador. El sitio no utiliza actualmente cookies publicitarias ni de seguimiento propias.',
        ],
      },
      {
        title: '3. Contacto y plataformas externas',
        paragraphs: [
          'Si decides comunicarte mediante llamada, WhatsApp, Instagram, TikTok o Facebook, los datos que compartas serán tratados en el contexto de tu consulta o pedido. Esas plataformas también pueden tratar información conforme a sus propias políticas de privacidad.',
          'No publiques ni envíes información sensible que no sea necesaria para atender tu solicitud.',
        ],
      },
      {
        title: '4. Conservación y seguridad',
        paragraphs: [
          'La información del carrito y del tema se conserva en tu navegador hasta que la elimines. Pollos Misión procura aplicar medidas razonables de seguridad, aunque ningún servicio conectado a Internet puede garantizar protección absoluta.',
        ],
      },
      {
        title: '5. Cambios y consultas',
        paragraphs: [
          'Esta política puede actualizarse si incorporamos nuevas funciones, por ejemplo formularios, pagos o analítica. Cualquier cambio se reflejará en esta página.',
          'Para consultas relacionadas con privacidad puedes comunicarte a los teléfonos 77632194 o 60514138.',
        ],
      },
    ],
  },
};

@Component({
  selector: 'pm-public-page',
  imports: [PageContainer, RouterLink],
  template: `
    <main class="py-10 sm:py-14">
      <pm-page-container>
        <article class="mx-auto max-w-4xl">
          <header class="border-b border-pm-border pb-7">
            <p class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-pm-red">
              Pollos Misión
            </p>
            <h1 class="text-4xl font-extrabold tracking-tight text-pm-foreground sm:text-5xl">
              {{ title }}
            </h1>
            <p class="mt-4 max-w-3xl leading-relaxed text-pm-foreground-muted">
              {{ content.introduction }}
            </p>
            <p class="mt-3 text-sm font-semibold text-pm-foreground-muted">
              Última actualización: 14 de agosto de 2026
            </p>
          </header>

          <div class="space-y-8 py-8">
            @for (section of content.sections; track section.title) {
              <section>
                <h2 class="text-xl font-black text-pm-foreground sm:text-2xl">
                  {{ section.title }}
                </h2>
                @for (paragraph of section.paragraphs ?? []; track paragraph) {
                  <p class="mt-3 leading-7 text-pm-foreground-muted">{{ paragraph }}</p>
                }
                @if (section.items?.length) {
                  <ul class="mt-3 list-disc space-y-2 pl-6 text-pm-foreground-muted">
                    @for (item of section.items; track item) {
                      <li class="pl-1 leading-7">{{ item }}</li>
                    }
                  </ul>
                }
              </section>
            }
          </div>

          <a
            routerLink="/"
            class="inline-flex rounded-full bg-pm-primary px-5 py-3 font-bold text-white hover:bg-pm-red"
          >
            Volver al inicio
          </a>
        </article>
      </pm-page-container>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicPage {
  private readonly routeData = inject(ActivatedRoute).snapshot.data;

  protected readonly title = this.routeData['title'] as string;
  protected readonly content = LEGAL_CONTENT[this.routeData['legalPage'] as string];
}
