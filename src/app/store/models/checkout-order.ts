import { ProductCreateOrderDto } from './productCreateOrder';
import { CheckoutDto } from './checkout';

export class CheckoutOrder {
  products!: ProductCreateOrderDto[];
  orderStatusId!: number;
  userId!: number;
  ordererFirstName!: string;
  ordererLastName!: string;
  phoneNumber!: string;
  email!: string;
  city!: string;
  street!: string;
  house!: string;
  apartment!: string;
  dateDelivery!: Date;
  overallPrice!: number;
  commentOrder!: string;
  doNotDisturb!: boolean;
  noContact!: boolean;

  constructor(checkout: CheckoutDto) {
    this.ordererFirstName = checkout.firstName;
    this.ordererLastName = checkout.lastName;
    this.street = checkout.street;
    this.city = checkout.city;
    this.apartment = checkout.apartment;
    this.house = checkout.house;
    this.email = checkout.email;
    this.phoneNumber = checkout.phoneNumber;
    this.overallPrice = checkout.overallPrice;
  }
}
