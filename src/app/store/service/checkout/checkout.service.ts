import { Injectable } from '@angular/core';
import {CheckoutDto} from "../../models/checkout";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private mockCheckout: CheckoutDto = {
    products: [
      // {productName: 'T-Shirt', sum: 200.50},
      // {productName: 'Jeans', sum: 256.00},
      // {productName: 'Belt', sum: 25.00},
    ],
    overallPrice: 456.50,
    firstName: 'Christopher',
    lastName: 'Hope',
    phoneNumber: '+380991555152',
    email: 'example@gmail.com',
    city: 'Kyiv',
    street: 'Vasylkivka st',
    house: '72',
    apartment: '18'
  };

  constructor() {
    // do nothing.
  }

  getCheckout(): Observable<CheckoutDto> {
    // todo: fetch checkout by url
    return from([this.mockCheckout]);
  }
}
