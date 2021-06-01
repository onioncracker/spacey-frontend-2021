import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AdminEmployeeComponent} from "./admin-manage/admin-employee.component";
import {AdminEditComponent} from "./admin-edit/admin-edit.component";

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/register', component: RegisterComponent},
  { path: 'admin/manage', component: AdminEmployeeComponent},
  { path: 'admin/edit', component: AdminEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
