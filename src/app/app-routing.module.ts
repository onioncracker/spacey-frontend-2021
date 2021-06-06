import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./views/login/loginComponent";
import {RegisterComponent} from "./views/register/register.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/register', component: RegisterComponent},
  { path: 'checkout', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
