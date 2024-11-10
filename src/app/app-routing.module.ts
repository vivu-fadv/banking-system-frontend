import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

export const routes: Routes = [
  { path: 'account-list', component: AccountListComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'update-account/:id', component: UpdateAccountComponent },
  { path: 'account-details/:id', component: AccountDetailsComponent },
  { path: '', redirectTo: '/account-list', pathMatch: 'full' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);