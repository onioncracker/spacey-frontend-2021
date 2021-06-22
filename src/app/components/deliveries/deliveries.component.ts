import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../store/service/order/order.service";
import Order from "../../store/models/order";
import {FormControl} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {OrderStatus} from "../../store/models/status";

@Component({
  selector: 'app-delivery',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css'],
})


export class DeliveriesComponent implements OnInit {

  displayedColumns: string[] = [
    'orderId',
    'status',
    'dateTime',
    'address',
    'phoneNumber',
    'actions',
    'action1',
    'action2',
  ];
  dataSource = new MatTableDataSource<Order>();
  orders: Order[] = [];
  date = new FormControl(new Date);


  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private datePipe: DatePipe,
  ) {
  }


  pickDataEvent(event: MatDatepickerInputEvent<Date>) {
    this.uploadData();
  }

  updateStatus(orderId: number, statusId: number): void {
    if (confirm("update status")) {
      this.ordersService.updateOrderStatus(new OrderStatus(orderId, statusId))
        .subscribe((res) => {
          alert(res);
          this.uploadData();
        });
    }
  }

  ngOnInit(): void {
    this.uploadData();
  }

  private uploadData(): void {
    this.ordersService.findAllOrders(<string>this.datePipe.transform(this.date.value, 'yyyy-MM-d'))
      .subscribe((data: Order[]) => {
        this.orders = data;
        this.dataSource = new MatTableDataSource(this.orders);
      });
  }
}
