import {ProductCreateOrderDto} from "./productCreateOrder";
import {CheckoutDto} from "./checkout";

export class Order {
  products!: ProductCreateOrderDto[]
  orderStatusId!: number;
  userId!: number;
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  email!: string;
  city!: string;
  street!: string;
  house!: string;
  apartment!: string;
  date!: Date;
  overallPrice!: number;
  commentOrder!: string;
  doNotDisturb!: boolean;
  noContact!: boolean;

  constructor(checkout: CheckoutDto) {
    this.firstName = checkout.firstName;
    this.lastName = checkout.lastName;
    this.street = checkout.street;
    this.city = checkout.city;
    this.apartment = checkout.apartment;
    this.house = checkout.house;
    this.email = checkout.email;
    this.phoneNumber = checkout.phoneNumber;
    this.overallPrice = checkout.overallPrice;
  }
}

