import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../store/service/order/order.service';
import Order from '../../store/models/order';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { ErrorPageService } from '../../store/service/error/error-page.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css'],
})
export class DeliveriesComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId',
    'dateTime',
    'address',
    'phoneNumber',
    'status',
    'actions',
    'action1',
    'action2',
  ];
  role = 'courier';
  finalStates = ['delivered', 'fail'];
  dataSource = new MatTableDataSource<Order>();
  orders: Order[] = [];
  date = new FormControl(new Date());
  dateFormat = 'yyyy-MM-d';
  buttonName = 'close';
  options = {
    title: 'Update status?',
    message: 'Status order will be changed.',
    cancelText: 'CANCEL',
    confirmText: 'YES',
  };

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private tokenStorageService: TokenStorageService,
    private errorPageService: ErrorPageService
  ) {}

  pickDataEvent() {
    this.uploadData();
  }

  updateStatus(orderId: number, status: string): void {
    this.dialogService.openConfirm(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.changeStatus(orderId, status);
      }
    });
  }

  private changeStatus(orderId: number, status: string): void {
    if (status === 'fail') {
      this.ordersService.updateOrderStatusFail(orderId).subscribe((res) => {
        this.dialogService.openMessage(
          'Status successful updated to FAIL',
          this.buttonName
        );
        this.uploadData();
      });
    }

    if (status === 'delivered') {
      this.ordersService.updateOrderStatusConfirm(orderId).subscribe((res) => {
        this.dialogService.openMessage(
          'Status successful updated to DELIVERED',
          this.buttonName
        );
        this.uploadData();
      });
    }
  }

  private uploadData(): void {
    this.ordersService.findAllOrders(this.transformData()).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.orders = data;
    });
  }

  private transformData(): string {
    return <string>this.datePipe.transform(this.date.value, this.dateFormat);
  }

  ngOnInit(): void {
    if (!this.isCourierRole()) {
      this.errorPageService.openErrorPage(
        'Access denied, please log-in as a courier'
      );
    }
    this.uploadData();
  }

  isCourierRole(): boolean {
    if (this.tokenStorageService.getRole() === null) {
      return false;
    }
    return this.tokenStorageService.getRole().toLowerCase() === this.role;
  }

  isStatusFinal(state: string): boolean {
    if (state.toLowerCase() === this.finalStates[0]) {
      return true;
    }
    if (state.toLowerCase() === this.finalStates[1]) {
      return true;
    }
    return false;
  }
}
