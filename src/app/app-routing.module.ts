import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './Component/account-list/account-list.component';
import { CreateAccountComponent } from './Component/create-account/create-account.component';
import { UpdateAccountComponent } from './Component/update-account/update-account.component';
import { AccountDetailsComponent } from './Component/account-details/account-details.component';
import { LoginSignupComponent } from './Component/login-signup/login-signup.component';
import { PagenotfoundComponent } from './Component/pagenotfound/pagenotfound.component';
import { ServerErrorComponent } from './Component/server-error/server-error.component';

export const routes: Routes = [
  { path: 'account-list', component: AccountListComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'update-account/:id', component: UpdateAccountComponent },
  { path: 'account-details/:id', component: AccountDetailsComponent },
  { path: 'login-signup', component: LoginSignupComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '', redirectTo: '/login-signup', pathMatch: 'full' },
  { path:'**', component:PagenotfoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);