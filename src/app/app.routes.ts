import { Routes } from '@angular/router';
import { ArticlesComponent } from './Home/articles/articles.component';
import { ClientsComponent } from './Home/clients/clients.component';
import { HomeComponent } from './Home/home.component';
import { QuotesComponent } from './Home/quotes/quotes.component';
import { ConsultComponent } from './Home/sales/consult/consult.component';
import { SalesV2Component } from './Home/sales/sales-v2/sales-v2.component';
import { SalesComponent } from './Home/sales/sales.component';
import { SettingsComponent } from './Home/settings/settings.component';
import { StoriesComponent } from './Home/stories/stories.component';
import { LoginComponent } from './login/login.component';
import { guardLoginGuard } from './guard-login.guard';


export const routes = [
  {path: '', component:LoginComponent},
  {path: 'Home', component:HomeComponent, canActivate: [guardLoginGuard],
    children:[
      {path: 'Articles', component:ArticlesComponent, canActivate: [guardLoginGuard]},
      {path: 'Clients', component:ClientsComponent, canActivate: [guardLoginGuard]},
      {path: 'Sales', component:SalesComponent, canActivate: [guardLoginGuard]},
      {path: 'SalesV2', component:SalesV2Component, canActivate: [guardLoginGuard]},
      {path: 'Settings', component:SettingsComponent, canActivate: [guardLoginGuard]},
      {path: 'ConsultSales', component:ConsultComponent, canActivate: [guardLoginGuard]},
      {path: 'Stories', component:StoriesComponent, canActivate: [guardLoginGuard]},
      {path: 'Quotes', component:QuotesComponent, canActivate: [guardLoginGuard]},
  ]}
];
