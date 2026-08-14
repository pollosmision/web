import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';

import { CatalogService } from './core/catalog/services/catalog.service';

const productTitle: ResolveFn<string> = (route) => {
  const product = inject(CatalogService).getProductBySlug(route.paramMap.get('slug') ?? '');
  return product ? `${product.name} | Pollos Misión` : 'Producto no encontrado | Pollos Misión';
};

const productDescription: ResolveFn<string> = (route) => {
  const product = inject(CatalogService).getProductBySlug(route.paramMap.get('slug') ?? '');
  return product?.description ?? 'El producto solicitado no está disponible en Pollos Misión.';
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then(({ PublicLayout }) => PublicLayout),
    children: [
      {
        path: '',
        title: 'Pollos Misión | Pollo frito en La Paz',
        data: {
          description:
            'Disfruta pollo frito crocante, papas, alitas y comida rápida de Pollos Misión en La Paz, Bolivia.',
        },
        loadComponent: () => import('./features/home/home').then(({ Home }) => Home),
      },
      {
        path: 'menu',
        title: 'Menú | Pollos Misión',
        data: {
          description:
            'Explora el menú de Pollos Misión: pollo broaster, alitas, salchipapas, conos de papas y bebidas.',
        },
        loadComponent: () => import('./features/menu/menu').then(({ Menu }) => Menu),
      },
      {
        path: 'producto/:slug',
        title: productTitle,
        resolve: { description: productDescription },
        loadComponent: () =>
          import('./features/product-detail/product-detail').then(
            ({ ProductDetail }) => ProductDetail,
          ),
      },
      {
        path: 'carrito',
        title: 'Carrito | Pollos Misión',
        data: {
          description: 'Revisa los productos seleccionados para tu pedido en Pollos Misión.',
          robots: 'noindex, nofollow',
        },
        loadComponent: () => import('./features/cart/cart').then(({ Cart }) => Cart),
      },
      {
        path: 'promociones',
        title: 'Promociones | Pollos Misión',
        data: {
          description:
            'Conoce las promociones y novedades de Pollos Misión para disfrutar en La Paz.',
        },
        loadComponent: () =>
          import('./features/promotions/promotions').then(({ Promotions }) => Promotions),
      },
      {
        path: 'nosotros',
        title: 'Nosotros | Pollos Misión',
        data: {
          description:
            'Conoce Pollos Misión, una propuesta paceña de pollo crocante con identidad cercana y espacial.',
        },
        loadComponent: () => import('./features/about/about').then(({ About }) => About),
      },
      {
        path: 'ubicacion',
        title: 'Ubicación | Pollos Misión',
        data: {
          description:
            'Encuentra la ubicación y teléfonos de contacto de Pollos Misión en La Paz, Bolivia.',
        },
        loadComponent: () =>
          import('./features/location/location').then(({ Location }) => Location),
      },
      ...[
        {
          path: 'terminos',
          title: 'Términos y condiciones',
          description: 'Contenido legal pendiente de publicación.',
        },
        {
          path: 'privacidad',
          title: 'Política de privacidad',
          description: 'Contenido legal pendiente de publicación.',
        },
      ].map(({ path, title, description }) => ({
        path,
        title: `${title} | Pollos Misión`,
        data: { title, description, robots: 'noindex, nofollow' },
        loadComponent: () =>
          import('./features/public-page/public-page').then(({ PublicPage }) => PublicPage),
      })),
      {
        path: '**',
        title: 'Página no encontrada | Pollos Misión',
        data: {
          description: 'La página solicitada no existe en Pollos Misión.',
          robots: 'noindex, nofollow',
        },
        loadComponent: () =>
          import('./features/not-found/not-found').then(({ NotFound }) => NotFound),
      },
    ],
  },
];
