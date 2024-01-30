import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverAccountComponent } from './components/recover-account/recover-account.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CartComponent } from './components/cart/cart.component';
import { BuyComponent } from './components/buy/buy.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { CPasswordComponent } from './components/c-password/c-password.component';
import { ListStatusComponent } from './components/list-status/list-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    RecoverAccountComponent,
    HomeComponent,
    CatalogueComponent,
    MyGamesComponent,
    ChangePasswordComponent,
    CartComponent,
    BuyComponent,
    ContactComponent,
    ListUsersComponent,
    ListProductsComponent,
    ChangeEmailComponent,
    CPasswordComponent,
    ListStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
