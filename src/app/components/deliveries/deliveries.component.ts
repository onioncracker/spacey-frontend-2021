import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../store/service/order/order.service";
import Order from "../../store/models/order";

@Component({
  selector: 'app-delivery',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css'],
})


export class DeliveriesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'orderId',
    'userId',
    'status',
    'dateTime',
    'address',
    'phoneNumber',
    'actions',
    'action1',
    'action2',
  ];
  dataSource = new MatTableDataSource<Order>();
  orders!: Order[];

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrderService,
  ) {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.ordersService.findAllOrders()
      .subscribe((data: Order[]) => this.orders = data);
    this.dataSource = new MatTableDataSource(this.orders);
  }
}
