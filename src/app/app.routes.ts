import { Routes } from '@angular/router';
import { LoginPage } from './components/pages/login/login-page';
import { HeaderPage } from './components/pages/header/header-page';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'header', component: HeaderPage },
];
