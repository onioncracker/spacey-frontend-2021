import { Component, Input } from '@angular/core';
import { CheckoutDto } from '../../store/models/checkout';
import { ProductCheckoutDto } from '../../store/models/productCheckout';
import CheckoutItem from '../../store/models/CheckoutItem';

@Component({
  selector: 'app-order-products',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  @Input() products!: CheckoutItem[];
}
