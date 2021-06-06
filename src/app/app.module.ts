import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from "./views/login/loginComponent";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from "./views/register/register.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {FooterComponent} from './components/footer/footer.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import { ConfirmComponent } from './views/confirm/confirm.component';
import { ItemsComponent } from './items/items.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { CommentComponent } from './components/comment/comment.component';
import { SummaryComponent } from './summary/summary.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, ToolbarComponent, FooterComponent, CheckoutComponent, ConfirmComponent, ItemsComponent, OrdersComponent, DeliveryComponent, CommentComponent, SummaryComponent, OrderComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule,
            BrowserAnimationsModule, MatToolbarModule, MatButtonModule, MatListModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
