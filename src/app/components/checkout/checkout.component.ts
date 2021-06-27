import {Component, OnInit} from '@angular/core';
import CheckoutService from '../../store/service/checkout/checkout.service';
import {CheckoutDto} from "../../store/models/checkout";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkout!: CheckoutDto;

  onCheckout() {
    alert("Checkout!")
  }

  constructor(private checkoutService: CheckoutService) {

  }

  ngOnInit(): void {

    this.checkoutService.getCheckout().subscribe((checkout: CheckoutDto) => this.checkout = checkout);
    console.log(this.checkout)
    // this.checkoutService.getCheckoutByCartId().subscribe((checkout: CheckoutDto) => this.checkout = checkout);
  }
}
