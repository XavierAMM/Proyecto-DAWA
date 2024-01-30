import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { CartComponent } from './components/cart/cart.component';
import { BuyComponent } from './components/buy/buy.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RegisterComponent } from './components/register/register.component';
import { CPasswordComponent } from './components/c-password/c-password.component';
import { RecoverAccountComponent } from './components/recover-account/recover-account.component';
import { ListStatusComponent } from './components/list-status/list-status.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'my-games', component: MyGamesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'buy/:id', component: BuyComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'change-email', component: ChangeEmailComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'recover-account', component: RecoverAccountComponent },
  {path: 'cambiar-password', component: CPasswordComponent},
  { path: 'list-status', component: ListStatusComponent },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

