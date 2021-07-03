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
import { SummaryComponent } from './components/summary/summary.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DeliveryInfoComponent } from './components/delivery-info/delivery-info.component';
import { CommentComponent } from './components/comment/comment.component';
import { LoginComponent } from './components/login/login.component';
import { AdminEmployeeComponent } from './components/admin-manage/admin-employee.component';
import { AdminAddComponent } from './components/admin-add/admin-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './store/service/AuthInterceptor';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { DatePipe } from '@angular/common';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { FilterComponent } from './components/filter/filter.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { ProductComponent } from './components/product/product.component';
import { PillComponent } from './components/pill/pill.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatRadioModule } from '@angular/material/radio';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AddAuctionComponent } from './components/add-auction/add-auction.component';
import { EditAuctionComponent } from './components/edit-auction/edit-auction.component';
import { CustomizationComponent } from './components/customization/customization.component';
import { DialogInputComponent } from './components/dialog-input/dialog-input.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { AuctionCatalogComponent } from './components/auction-catalog/auction-catalog.component';
import { AuctionComponent } from './components/auction/auction.component';
import { PillAuctionComponent } from './components/pill-auction/pill-auction.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
<<<<<<< HEAD
import { ErrorPageComponent } from './components/error-page/error-page.component';
=======
import { ProfileComponent } from './components/profile/profile.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
>>>>>>> 281b027258d9aaeffab9b37160c78b142abe73eb

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    FooterComponent,
    CheckoutComponent,
    SummaryComponent,
    OrdersComponent,
    DeliveryInfoComponent,
    DeliveriesComponent,
    CommentComponent,
    ProductDetailsComponent,
    AdminEmployeeComponent,
    AdminAddComponent,
    AdminEditComponent,
    ComparisonComponent,
    AddProductComponent,
    EditProductComponent,
    DeliveryComponent,
    DialogMessageComponent,
    ShoppingCartComponent,
    ConfirmRegistrationComponent,
    HeaderComponent,
    ProductCatalogComponent,
    FilterComponent,
    SortingComponent,
    ProductComponent,
    PillComponent,
    PaginationComponent,
    PersonalInformationComponent,
    EmployeeProfileComponent,
    UserProfileComponent,
    ConfirmComponent,
    AddAuctionComponent,
    EditAuctionComponent,
    CustomizationComponent,
    DialogInputComponent,
    AuctionCatalogComponent,
    AuctionComponent,
    PillAuctionComponent,
    AuctionDetailsComponent,
<<<<<<< HEAD
    ErrorPageComponent,
=======
    ProfileComponent,
    RecoverPasswordComponent,
>>>>>>> 281b027258d9aaeffab9b37160c78b142abe73eb
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatGridListModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    NgxCaptchaModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
