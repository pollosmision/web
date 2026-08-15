import { Promotion } from '../models/promotion.model';

export const PROMOTION_MOCK: readonly Promotion[] = [
  {
    id: 'promo-pollo-refresco',
    eyebrow: 'Combo Órbita',
    title: 'Pollo + refresco',
    description:
      'Disfruta una porción de pollo crocante acompañada de un refresco. Precio y disponibilidad por confirmar.',
    imageUrl: '/images/promotions/pollo-refresco.webp',
    imageAlt: 'Porción de pollo frito crocante acompañada de un refresco con hielo',
  },
  {
    id: 'promo-salchipapa-jugo',
    eyebrow: 'Combo Galaxia',
    title: 'Salchipapa + jugo',
    description:
      'Una salchipapa lista para compartir con el sabor refrescante de un jugo. Precio y disponibilidad por confirmar.',
    imageUrl: '/images/promotions/salchipapa-jugo.webp',
    imageAlt: 'Plato de salchipapa con salsa acompañado de un vaso de jugo',
  },
  {
    id: 'promo-cono-jugo',
    eyebrow: 'Combo Despegue',
    title: 'Cono de papas + jugo',
    description:
      'Tu cono de papas favorito acompañado de un jugo para completar la misión. Precio y disponibilidad por confirmar.',
    imageUrl: '/images/promotions/cono-jugo.webp',
    imageAlt: 'Cono rojo con papas fritas acompañado de un vaso de jugo',
  },
];
