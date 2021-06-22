import {Component, OnInit} from '@angular/core';
import OrderDetails from "../../store/models/orderDetails";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../store/service/order/order.service";
import {OrderStatus, Status, statuses} from "../../store/models/status";


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  title = 'Orders';
  order!: OrderDetails;
  status!: string;
  statuses: Status[] = statuses;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
  ) {
  }

  onChange(event) {
    console.log(event.value);
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    if (confirm("update status")) {
      this.ordersService.updateOrderStatus(new OrderStatus(id, event.value.statusId))
        .subscribe(res => {
          alert(res)
          this.ordersService.findOrderById(id)
            .subscribe((data) => {
              this.order = data;
              console.log(data)
            });
        });
    }

  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.ordersService.findOrderById(id)
      .subscribe((data) => {
        this.order = data;
        console.log(data)
      });
  }
}
