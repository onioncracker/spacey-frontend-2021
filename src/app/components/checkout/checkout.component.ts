import {Component, OnInit} from '@angular/core';
import CheckoutService from '../../store/service/checkout/checkout.service';
import {Order} from "../../store/models/order";
import {PersonalInformation} from "../../store/models/personal-information";
import {CheckoutDto} from "../../store/models/checkout";
import CheckoutItem from "../../store/models/CheckoutItem";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  order!: Order;
  products!: CheckoutItem[];

  isFormValid = true;

  getPersonalInformation(personalInformation: PersonalInformation) {
    this.order.firstName = personalInformation.firstName;
    this.order.lastName = personalInformation.lastName;
    this.order.phoneNumber = personalInformation.phoneNumber;
    this.order.email = personalInformation.email;
    this.order.city = personalInformation.city;
    this.order.street = personalInformation.street;
    this.order.house = personalInformation.house;
    this.order.apartment = personalInformation.apartment;
  }

  getComment(comment: string) {
    this.order.commentOrder = comment;
  }

  getDelivery(delivery: Order) {
    console.log(delivery);
    console.log(this.order.noContact);
    this.order.noContact = false;
    this.order.doNotDisturb = true;
  }

  onCheckout() {
    console.log(this.order);
  }

  constructor(private checkoutService: CheckoutService) {
  }

  ngOnInit(): void {
    this.checkoutService.getCheckout().subscribe((checkout: CheckoutDto) => {
      this.order = new Order(checkout);
      this.products = checkout.products;
    });
  }
}
