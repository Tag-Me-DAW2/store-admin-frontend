import { Routes } from '@angular/router';
import { LoginPage } from './components/pages/login/login-page';
import { DashboardPage } from './components/pages/dashboard/dashboard-page';
import { loginGuard } from './guards/login-guard';
import { dashboardGuard } from './guards/dashboard-guard';
import { ProductPage } from './components/pages/productPage/product-page';

export const routes: Routes = [
  { path: '', component: LoginPage },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [loginGuard, dashboardGuard],
    children: [{ path: 'products', component: ProductPage }],
  },
];
