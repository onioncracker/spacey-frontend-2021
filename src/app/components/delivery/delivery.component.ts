import {Component, EventEmitter, Output} from '@angular/core';
import {Delivery} from "../../store/models/delivery";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent {
  @Output() deliveryOptionsEvent = new EventEmitter<boolean>();
  @Output() deliveryDateEvent = new EventEmitter<Date>();
  delivery!: Delivery;
  doNotDisturb!: boolean;
  noContact!: boolean;
  date!: Date;

  onChangeDelivery1() {
    this.deliveryOptionsEvent.emit(this.doNotDisturb);
  }

  onChangeDelivery2() {
    this.deliveryOptionsEvent.emit(this.noContact);
  }

  onChangeDate() {
    this.deliveryDateEvent.emit(this.date)
  }

}
