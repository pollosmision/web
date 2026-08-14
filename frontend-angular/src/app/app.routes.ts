import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout').then(({ PublicLayout }) => PublicLayout),
    children: [
      {
        path: '',
        title: 'Pollos Misión',
        loadComponent: () => import('./features/home/home').then(({ Home }) => Home),
      },
      {
        path: 'menu',
        title: 'Menú | Pollos Misión',
        loadComponent: () => import('./features/menu/menu').then(({ Menu }) => Menu),
      },
      {
        path: 'producto/:slug',
        title: 'Producto | Pollos Misión',
        loadComponent: () =>
          import('./features/product-detail/product-detail').then(
            ({ ProductDetail }) => ProductDetail,
          ),
      },
      {
        path: 'carrito',
        title: 'Carrito | Pollos Misión',
        loadComponent: () => import('./features/cart/cart').then(({ Cart }) => Cart),
      },
      {
        path: 'promociones',
        title: 'Promociones | Pollos Misión',
        loadComponent: () =>
          import('./features/promotions/promotions').then(({ Promotions }) => Promotions),
      },
      {
        path: 'nosotros',
        title: 'Nosotros | Pollos Misión',
        loadComponent: () => import('./features/about/about').then(({ About }) => About),
      },
      {
        path: 'ubicacion',
        title: 'Ubicación | Pollos Misión',
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
        data: { title, description },
        loadComponent: () =>
          import('./features/public-page/public-page').then(({ PublicPage }) => PublicPage),
      })),
      {
        path: '**',
        title: 'Página no encontrada | Pollos Misión',
        loadComponent: () =>
          import('./features/not-found/not-found').then(({ NotFound }) => NotFound),
      },
    ],
  },
];
