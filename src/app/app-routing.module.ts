import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { routeUrls } from '../environments/router-manager';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AdminEmployeeComponent } from './components/admin-manage/admin-employee.component';
import { AdminAddComponent } from './components/admin-add/admin-add.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddAuctionComponent } from './components/add-auction/add-auction.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { EditAuctionComponent } from './components/edit-auction/edit-auction.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderInHistoryComponent } from './components/order-in-history/order-in-history.component';
import { CustomizationComponent } from './components/customization/customization.component';
import { AuctionCatalogComponent } from './components/auction-catalog/auction-catalog.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader/image-uploader.component';
import { EmailForRecoverPassComponent } from './components/email-for-recover-pass/email-for-recover-pass.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  { path: routeUrls.login, component: LoginComponent },
  { path: routeUrls.register, component: RegisterComponent },
  { path: routeUrls.checkout, component: CheckoutComponent },
  { path: routeUrls.productDetails, component: ProductDetailsComponent },
  { path: routeUrls.deliveries, component: DeliveriesComponent },
  { path: routeUrls.delivery, component: DeliveryComponent },
  { path: routeUrls.adminEmployee, component: AdminEmployeeComponent },
  { path: routeUrls.adminAdd, component: AdminAddComponent },
  { path: routeUrls.adminEdit, component: AdminEditComponent },
  { path: routeUrls.comparisons, component: ComparisonComponent },
  { path: routeUrls.addProduct, component: AddProductComponent },
  { path: routeUrls.editProduct, component: EditProductComponent },
  { path: routeUrls.shoppingCart, component: ShoppingCartComponent },
  { path: routeUrls.productCatalog, component: ProductCatalogComponent },
  { path: routeUrls.addAuction, component: AddAuctionComponent },
  { path: routeUrls.editAuction, component: EditAuctionComponent },
  { path: routeUrls.auctionCatalog, component: AuctionCatalogComponent },
  { path: routeUrls.auctionDetails, component: AuctionDetailsComponent },
  {
    path: routeUrls.confirmRegistration,
    component: ConfirmRegistrationComponent,
  },
  { path: routeUrls.orderHistory, component: OrderHistoryComponent },
  { path: routeUrls.orderInHistory, component: OrderInHistoryComponent },
  { path: routeUrls.customization, component: CustomizationComponent },
  { path: routeUrls.errorPage, component: ErrorPageComponent },
  { path: routeUrls.profile, component: ProfileComponent },
  { path: routeUrls.recoverPassword, component: RecoverPasswordComponent },
  { path: routeUrls.createPassword, component: CreatePasswordComponent },
  { path: routeUrls.homepage, component: HomepageComponent },
  { path: routeUrls.imageUploader, component: ImageUploaderComponent },
  { path: routeUrls.emailForRecover, component: EmailForRecoverPassComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
