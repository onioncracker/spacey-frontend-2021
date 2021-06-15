import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { routeUrls } from '../environments/router-manager';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product/product-details.component';
import { AdminEmployeeComponent } from './components/admin-manage/admin-employee.component';
import { AdminAddComponent } from './components/admin-add/admin-add.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductCartComponent } from './components/product-cart/product-cart.component';

const routes: Routes = [
  { path: routeUrls.login, component: LoginComponent },
  { path: routeUrls.register, component: RegisterComponent },
  { path: routeUrls.checkout, component: CheckoutComponent },
  { path: routeUrls.products, component: ProductsComponent },
  { path: routeUrls.productDetails, component: ProductDetailsComponent },
  { path: routeUrls.adminEmployee, component: AdminEmployeeComponent },
  { path: routeUrls.adminAdd, component: AdminAddComponent },
  { path: routeUrls.adminEdit, component: AdminEditComponent },
  { path: routeUrls.comparisons, component: ComparisonComponent },
  { path: routeUrls.addProduct, component: AddProductComponent },
  { path: routeUrls.editProduct, component: EditProductComponent },
  { path: routeUrls.productCart, component: ProductCartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
