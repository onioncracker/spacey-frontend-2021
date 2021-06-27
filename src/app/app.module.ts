import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { CommentComponent } from './components/comment/comment.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { AdminEmployeeComponent } from './components/admin-manage/admin-employee.component';
import { AdminAddComponent } from './components/admin-add/admin-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './store/service/AuthInterceptor';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { HeaderComponent } from './components/header/header.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ProductsCatalogComponent } from './components/products-catalog/products-catalog.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductComponent } from './components/product/product.component';
import { PillComponent } from './components/pill/pill.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    FooterComponent,
    CheckoutComponent,
    ConfirmComponent,
    OrdersComponent,
    DeliveryComponent,
    CommentComponent,
    OrderComponent,
    ProductDetailsComponent,
    PaginationComponent,
    AdminEmployeeComponent,
    AdminAddComponent,
    AdminEditComponent,
    ComparisonComponent,
    AddProductComponent,
    EditProductComponent,
    DialogMessageComponent,
    ManageProductsComponent,
    ShoppingCartComponent,
    ConfirmRegistrationComponent,
    HeaderComponent,
    ProductsCatalogComponent,
    FilterComponent,
    ProductComponent,
    PillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTableModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule,
    NgxCaptchaModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
