import { Component, Input, OnInit } from '@angular/core';
import {CheckoutOrder} from "../../store/models/checkout-order";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css', '../checkout/checkout.component.css'],
})
export class ConfirmComponent implements OnInit {
  @Input() checkout!: CheckoutOrder;
  constructor() { }

  ngOnInit(): void {
  }
}
