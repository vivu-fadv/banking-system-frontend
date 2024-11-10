import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';

export const routes: Routes = [
  { path: 'accounts', component: AccountListComponent },
  { path: '', redirectTo: '/accounts', pathMatch: 'full' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);