import {ProductCreateOrderDto} from "./productCreateOrder";

export class CreateOrderDto {
  products: ProductCreateOrderDto[]
  orderStatusId: number;
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  date: Date;
  overallPrice: number;
  commentOrder: string;
  doNotDisturb: boolean;
  noContant: boolean;

  constructor(products: ProductCreateOrderDto[], orderStatusId: number, userId: number, firstName: string, lastName: string, phoneNumber: string, city: string, street: string, house: string, apartment: string, date: Date, overallPrice: number, commentOrder: string, doNotDisturb: boolean, noContant: boolean) {
    this.products = products;
    this.orderStatusId = orderStatusId;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.street = street;
    this.house = house;
    this.apartment = apartment;
    this.date = date;
    this.overallPrice = overallPrice;
    this.commentOrder = commentOrder;
    this.doNotDisturb = doNotDisturb;
    this.noContant = noContant;
  }
}
