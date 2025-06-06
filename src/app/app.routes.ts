import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { LoginComponent } from './login/login.component';
import { rememberGuard, rememberGuardChild } from './remember.guard';
import { loginGuard } from './login.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [rememberGuard],
    children: [
      {
        path: 'Articles',
        loadComponent: () =>
          import('./Home/articles/articles.component').then(m => m.ArticlesComponent),
      },
      {
        path: 'Clients',
        loadComponent: () =>
          import('./Home/clients/clients.component').then(m => m.ClientsComponent),
      },
      {
        path: 'Sales',
        loadComponent: () =>
          import('./Home/sales/sales.component').then(m => m.SalesComponent),
      },
      {
        path: 'SalesV2',
        loadComponent: () =>
          import('./Home/sales/sales-v2/sales-v2.component').then(m => m.SalesV2Component),
      },
      {
        path: 'Settings',
        loadComponent: () =>
          import('./Home/settings/settings.component').then(m => m.SettingsComponent),
      },
      {
        path: 'ConsultSales',
        loadComponent: () =>
          import('./Home/sales/consult/consult.component').then(m => m.ConsultComponent),
      },
      {
        path: 'Stories',
        loadComponent: () =>
          import('./Home/stories/stories.component').then(m => m.StoriesComponent),
      },
      {
        path: 'Quotes',
        loadComponent: () =>
          import('./Home/quotes/quotes.component').then(m => m.QuotesComponent),
      },
    ],
  },
];
