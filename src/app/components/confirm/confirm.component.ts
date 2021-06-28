import { Component, Input, OnInit } from '@angular/core';
import {Order} from "../../store/models/order";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css', '../checkout/checkout.component.css'],
})
export class ConfirmComponent implements OnInit {
  @Input() checkout!: Order;
  constructor() { }

  ngOnInit(): void {
  }
}
