import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../store/service/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(private checkoutService: CheckoutService) {}
}
