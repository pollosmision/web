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
      ...[
        {
          path: 'promociones',
          title: 'Promociones',
          description: 'Estamos preparando promociones para tu próxima misión.',
        },
        {
          path: 'nosotros',
          title: 'Nosotros',
          description: 'Conoce muy pronto la historia de Pollos Misión.',
        },
        {
          path: 'ubicacion',
          title: 'Ubicación',
          description: 'Próximamente encontrarás aquí nuestra base en La Paz.',
        },
        {
          path: 'carrito',
          title: 'Carrito',
          description: 'El carrito estará disponible en una siguiente etapa.',
        },
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
    ],
  },
  { path: '**', redirectTo: '' },
];
