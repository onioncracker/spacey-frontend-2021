import { Component, Input } from '@angular/core';
import { CheckoutOrder } from '../../store/models/checkout-order';

@Component({
  selector: 'app-confirm',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css', '../checkout/checkout.component.css'],
})
export class SummaryComponent {
  @Input() checkout!: CheckoutOrder;
}
