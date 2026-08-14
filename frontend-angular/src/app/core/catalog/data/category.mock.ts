import { MenuCategory } from '../models/menu-category.model';

export const CATEGORY_MOCK: readonly MenuCategory[] = [
  {
    id: 'pollo-broaster',
    slug: 'pollo-broaster',
    name: 'Pollo Broaster',
    description: 'Pollo crocante acompañado de papas y arroz.',
    visualLabel: 'PB',
  },
  {
    id: 'pollo-canasta',
    slug: 'pollo-canasta',
    name: 'Pollo a la Canasta',
    description: 'Pollo crocante servido con una generosa porción de papas.',
    visualLabel: 'PC',
  },
  {
    id: 'alitas-fingers',
    slug: 'alitas-fingers',
    name: 'Alitas & Fingers',
    description: 'Opciones crocantes listas para disfrutar con salsas.',
    visualLabel: 'AF',
  },
  {
    id: 'salchipapas',
    slug: 'salchipapas',
    name: 'Salchipapas',
    description: 'Clásicos favoritos con papas, salchicha, arroz o pollo.',
    visualLabel: 'SP',
  },
  {
    id: 'conos-papas',
    slug: 'conos-papas',
    name: 'Conos de Papas',
    description: 'Papas para llevar en opciones simples o combinadas.',
    visualLabel: 'CP',
  },
  {
    id: 'extras',
    slug: 'extras',
    name: 'Extras',
    description: 'Porciones adicionales de papas y arroz para completar tu pedido.',
    visualLabel: 'EX',
  },
  {
    id: 'gaseosas',
    slug: 'gaseosas',
    name: 'Gaseosas',
    description: 'Bebidas refrescantes para acompañar tu comida.',
    visualLabel: 'GA',
  },
  {
    id: 'jugos-bebidas',
    slug: 'jugos-bebidas',
    name: 'Jugos & Bebidas',
    description: 'Jugos y bebidas, incluyendo nuestra chicha morada.',
    visualLabel: 'JB',
  },
];
