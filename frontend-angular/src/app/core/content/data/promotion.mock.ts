import { Promotion } from '../models/promotion.model';

export const PROMOTION_MOCK: readonly Promotion[] = [
  {
    id: 'promo-martes-mision',
    productSlug: 'promo-martes-mision',
    eyebrow: 'Promoción de ejemplo · 20% de descuento',
    title: 'Martes de Misión',
    description:
      'Disfruta el Combo Pollo + Refresco con 20% de descuento todos los martes. Sujeto a disponibilidad y confirmación por WhatsApp.',
    imageUrl: '/images/promotions/pollo-refresco.webp',
    imageAlt: 'Porción de pollo frito crocante acompañada de un refresco con hielo',
  },
  {
    id: 'promo-miercoles-galactico',
    productSlug: 'promo-miercoles-galactico',
    eyebrow: 'Promoción de ejemplo · 15% de descuento',
    title: 'Miércoles Galáctico',
    description:
      'Disfruta el Combo Salchipapa + Jugo con 15% de descuento todos los miércoles. Sujeto a disponibilidad y confirmación por WhatsApp.',
    imageUrl: '/images/promotions/salchipapa-jugo.webp',
    imageAlt: 'Plato de salchipapa con salsa acompañado de un vaso de jugo',
  },
  {
    id: 'promo-viernes-despegue',
    productSlug: 'promo-viernes-despegue',
    eyebrow: 'Promoción de ejemplo · 10% de descuento',
    title: 'Viernes de Despegue',
    description:
      'Disfruta el Combo Cono de Papas + Jugo con 10% de descuento todos los viernes. Sujeto a disponibilidad y confirmación por WhatsApp.',
    imageUrl: '/images/promotions/cono-jugo.webp',
    imageAlt: 'Cono rojo con papas fritas acompañado de un vaso de jugo',
  },
];
