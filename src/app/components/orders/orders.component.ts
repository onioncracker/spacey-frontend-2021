import {Component, Input} from '@angular/core';
import {CheckoutDto} from "../../store/models/checkout";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  @Input() checkout!: CheckoutDto

  delete(id: number) {
    alert("test!")
    let index = this.checkout.products.findIndex(x => x.productId === id) ;
    if (index > -1) {
      this.checkout.products = this.checkout.products.splice(index, 1);
    }
    // this.checkout.products = this.checkout.products.splice(id, 1);
  }

  constructor() {
    // do nothing.
  }
}
