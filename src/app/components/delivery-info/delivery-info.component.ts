import { Component, EventEmitter, Output } from '@angular/core';
import { Delivery } from '../../store/models/delivery';
import { FormControl } from '@angular/forms';
import CheckoutService from '../../store/service/checkout/checkout.service';
import { Timeslot } from '../../store/models/timeslots.model';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css'],
})
export class DeliveryInfoComponent {
  @Output() deliveryEvent = new EventEmitter<Delivery>();
  datePicker = new FormControl(new Date());
  delivery!: Delivery;
  dates: Timeslot[] = [
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
    new Timeslot(new Date()),
  ];
  doNotDisturb = false;
  noContact = false;

  constructor(private checkoutService: CheckoutService) {}

  onChangeDelivery() {
    this.delivery = new Delivery(new Date(), this.doNotDisturb, this.noContact);
    this.deliveryEvent.emit(this.delivery);
  }

  pickDataEvent() {
    this.checkoutService
      .getTimeSlots(this.datePicker.value)
      .subscribe((data: Timeslot[]) => {
        this.dates = data;
      });
  }
}
