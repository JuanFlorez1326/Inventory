import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/products-page.component').then((m) => m.ProductsPageComponent),
    children: [
        {
            path: 'list',
            loadComponent: () => import('./features/products/components/product-list/product-list.component').then((m) => m.ProductList),
        },
        {
            path: 'form',
            loadComponent: () => import('./features/products/components/product-form/product-form.component').then((m) => m.ProductForm),
        }
    ],
  },
  {
    path: '**',
    redirectTo: 'products/list',
  }
];
