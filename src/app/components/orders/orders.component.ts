import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  @Input() checkout: any

  constructor() {
    // do nothing.
  }
}
