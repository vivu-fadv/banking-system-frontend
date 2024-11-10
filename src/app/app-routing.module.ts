import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';

export const routes: Routes = [
  { path: 'account-list', component: AccountListComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: '', redirectTo: '/account-list', pathMatch: 'full' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);