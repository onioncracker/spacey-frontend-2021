import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/loginComponent";
import {RegisterComponent} from "./components/register/register.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {routeUrls} from "../environments/router-manager";
const routes: Routes = [
  { path: routeUrls.login, component: LoginComponent },
  { path: routeUrls.register, component: RegisterComponent },
  { path: routeUrls.checkout, component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
