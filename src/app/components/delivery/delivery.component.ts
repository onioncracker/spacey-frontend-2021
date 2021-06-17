import { Component, OnInit } from '@angular/core';
import order from "../../store/models/order";
import Order from "../../store/models/order";
import OrderDetails, {orderDetail} from "../../store/models/orderDetails";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  title = 'Orders';
  order!: OrderDetails;

  constructor() { }

  ngOnInit(): void {
     this.order = orderDetail;
  }
}
