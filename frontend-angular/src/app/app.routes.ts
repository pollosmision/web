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
    ],
  },
  { path: '**', redirectTo: '' },
];
