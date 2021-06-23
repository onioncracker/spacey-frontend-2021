import { Injectable } from '@angular/core';
import {CheckoutDto} from "../../models/checkout";
import {from, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment} from "../../../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export default class CheckoutService {
  private mockCheckout: CheckoutDto = {
    products: [
      {
        productId: 0,
        productName: 'T-Shirt',
        color: 'red',
        sizeName: 'S',
        photo: 'https://i.pinimg.com/originals/95/30/41/953041070f000d45c05c912005f63724.jpg',
        amount: 2,
        sum: 210.50
      },
      {
        productId: 1,
        productName: 'T-Shirt',
        color: 'red',
        sizeName: 'S',
        photo: 'https://i.pinimg.com/originals/95/30/41/953041070f000d45c05c912005f63724.jpg',
        amount: 2,
        sum: 200.50
      },
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

  constructor(private http: HttpClient) {
    // do nothing.
  }

  private checkoutUrl = environment.url + '/api/checkout/';

  getCheckoutByCartId(id: number): Observable<CheckoutDto> {
    return this.http.get<CheckoutDto>(this.checkoutUrl + id)
  }

  getCheckoutByUserId(id: number) : Observable<CheckoutDto> {
    return this.http.get<CheckoutDto>(this.checkoutUrl + id)
  }

  getCheckout(): Observable<CheckoutDto> {
    return from([this.mockCheckout]);
    // return this.http.get<CheckoutDto>(this.checkoutUrl);
  }
}
