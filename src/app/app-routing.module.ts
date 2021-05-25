import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {LoginComponent} from "./login/loginComponent";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  // { path: 'auth/login', component: LoginComponent},
  { path: 'auth/register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
