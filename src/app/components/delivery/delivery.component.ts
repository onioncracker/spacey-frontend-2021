import {Component, EventEmitter, Output} from '@angular/core';
import {Delivery} from "../../store/models/delivery";
import {PersonalInformation} from "../../store/models/personal-information";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent {
  @Output() deliveryEvent = new EventEmitter<Delivery>();
  delivery!: Delivery;

  onChangeDelivery() {
    this.delivery = new Delivery(
      this.delivery.date,
      this.delivery.doNotDisturb,
      this.delivery.noContact
    );
    this.deliveryEvent.emit(this.delivery);
  }
}
