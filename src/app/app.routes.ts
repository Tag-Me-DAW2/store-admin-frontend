import {Routes} from '@angular/router';
import {LoginPage} from './components/pages/login/login-page';
import {DashboardPage} from './components/pages/dashboard/dashboard-page';

export const routes: Routes = [
  {path: '', component: LoginPage},
  {
    path: 'dashboard', component: DashboardPage, children:
      [
      ]
  },
];
