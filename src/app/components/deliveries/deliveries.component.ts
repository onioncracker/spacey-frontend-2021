import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Order, {orders} from 'src/app/store/models/order';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-delivery',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css'],
})
// @ViewChild(MatPaginator) paginator!: MatPaginator;

export class DeliveriesComponent implements OnInit {
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
  dataSource = new MatTableDataSource<Order>(orders);
  orders!: Order[];

  constructor(
    private route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    // this.orders = orders
    // this.dataSource.paginator! = this.paginator;
  }
}
