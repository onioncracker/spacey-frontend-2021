import { Component, OnInit } from '@angular/core';
import OrderDetails from '../../store/models/orderDetails';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../store/service/order/order.service';
import { Status, statuses } from '../../store/models/status';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { ErrorPageService } from '../../store/service/error/error-page.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {
  title = 'Orders';
  order!: OrderDetails;
  status!: string;
  statuses: Status[] = statuses;
  finalStates = ['delivered', 'fail'];
  role = 'courier';

  options = {
    title: 'Update status?',
    message: 'Status order will be changed.',
    cancelText: 'CANCEL',
    confirmText: 'YES',
  };

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
    private dialogService: DialogService,
    private tokenStorageService: TokenStorageService,
    private errorPageService: ErrorPageService
  ) {}

  onChange(event) {
    this.dialogService.openConfirm(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.updateStatus(this.getOrderId(), event);
      }
    });
  }

  ngOnInit(): void {
    if (!this.isCourierRole()) {
      this.errorPageService.openErrorPage(
        'Access denied, please log-in as a courier'
      );
    } else {
      this.findOrderById();
    }
  }

  private getOrderId(): number {
    return parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  private findOrderById(): void {
    this.ordersService.findOrderById(this.getOrderId()).subscribe((data) => {
      this.order = data;
    });
  }

  private updateStatus(id, event): void {
    if (event.value.statusName.toLowerCase() === 'delivered') {
      this.ordersService.updateOrderStatusConfirm(id).subscribe((res) => {
        this.findOrderById();
        this.dialogService.openMessage(
          'Status successful updated to DELIVERED',
          'close'
        );
      });
    }
    if (event.value.statusName.toLowerCase() === 'fail') {
      this.ordersService.updateOrderStatusFail(id).subscribe((res) => {
        this.findOrderById();
        this.dialogService.openMessage(
          'Status successful updated to FAIL',
          'close'
        );
      });
    }
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
