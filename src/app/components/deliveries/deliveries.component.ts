import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../store/service/order/order.service";
import Order from "../../store/models/order";
import {FormControl} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {OrderStatus} from "../../store/models/status";
import {Subscription} from "rxjs";
import {MatDialogConfig} from "@angular/material/dialog";
import {DialogMessageComponent} from "../dialog-message/dialog-message.component";
import {ConfirmComponent} from "../confirm/confirm.component";
import {DialogService} from "../../store/service/dialog/dialog.service";

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
  uploadSubscription!: Subscription;
  subscriptions!: Subscription;
  dateFormat = 'yyyy-MM-d';
  buttonName = 'close';
  options = {
    title: 'Update status?',
    message: 'Status order will be changed.',
    cancelText: 'CANCEL',
    confirmText: 'YES'
  };


  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private datePipe: DatePipe,
    private dialogService: DialogService,
  ) {
  }


  pickDataEvent() {
    this.uploadData();
  }

  updateStatus(orderId: number, statusId: number): void {
    this.dialogService.openConfirm(this.options)
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.changeStatus(orderId, statusId);
      }
    });
  }

  private changeStatus(orderId: number, statusId: number): void {
    this.ordersService.updateOrderStatus(new OrderStatus(orderId, statusId))
      .subscribe((res) => {
        this.dialogService.openMessage('Status successful updated', this.buttonName);
        this.uploadData();
      });
  }

  private uploadData(): void {
    this.uploadSubscription = this.ordersService
      .findAllOrders(this.transformData())
      .subscribe(data => this.dataSource = new MatTableDataSource(data));
  }


  private transformData(): string {
    return <string>this.datePipe.transform(this.date.value, this.dateFormat);
  }

  ngOnInit(): void {
    this.uploadData();
  }
}
