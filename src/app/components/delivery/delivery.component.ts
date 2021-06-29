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
  doNotDisturb = false;
  noContact = false;

  onChangeDelivery() {
    this.delivery = new Delivery(
      new Date(),
      this.doNotDisturb,
      this.noContact
    );
    this.deliveryEvent.emit(this.delivery)
  }
}
