import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../store/service/order/order.service';
import Order from '../../store/models/order';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DialogService } from '../../store/service/dialog/dialog.service';

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId',
    'status',
    'dateTime',
    'address',
    'phoneNumber',
    'actions',
  ];
  dataSource = new MatTableDataSource<Order>();
  orders: Order[] = [];
  date = new FormControl(new Date());
  dateFormat = 'yyyy-MM-d';
  buttonName = 'close';

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private datePipe: DatePipe,
    private dialogService: DialogService
  ) {}

  pickDataEvent() {
    this.uploadData();
  }

  private uploadData(): void {
    this.ordersService
      .findAllOrdersForCustomer(this.transformData())
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.orders = data;
      });
  }

  private transformData(): string {
    return <string>this.datePipe.transform(this.date.value, this.dateFormat);
  }

  ngOnInit(): void {
    this.uploadData();
  }
}
