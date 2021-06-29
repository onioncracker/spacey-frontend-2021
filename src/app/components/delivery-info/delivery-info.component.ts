import {Component, EventEmitter, Output} from '@angular/core';
import {Delivery} from "../../store/models/delivery";
import {PersonalInformation} from "../../store/models/personal-information";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css'],
})
export class DeliveryInfoComponent {
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
