import {Component, OnDestroy, OnInit} from '@angular/core';
import { CheckoutService } from '../../store/service/checkout/checkout.service';
import {CheckoutDto, ProductCheckoutDto} from "../../store/models/checkout";
import {Observable} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})


export class CheckoutComponent implements OnInit {
  checkout: any;

  constructor(private checkoutService: CheckoutService) {

  }

  ngOnInit(): void {
    this.checkoutService.getCheckout()
      .subscribe((checkout: CheckoutDto) => this.checkout = checkout);
  }
}
