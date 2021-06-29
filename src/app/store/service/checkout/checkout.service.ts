import { Injectable } from '@angular/core';
import { CheckoutDto } from '../../models/checkout';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CheckoutOrder } from '../../models/checkout-order';

@Injectable({
  providedIn: 'root',
})
export default class CheckoutService {
  constructor(private http: HttpClient) {
    // do nothing.
  }

  getCheckout(): Observable<CheckoutDto> {
    const checkoutUrl = environment.url + '/api/v1/checkout/';
    return this.http.get<CheckoutDto>(checkoutUrl);
  }

  makeOrder(order: CheckoutOrder): Observable<CheckoutOrder> {
    const checkoutUrl = environment.url + '/api/v1/order-authorized/';
    return this.http.post<CheckoutOrder>(checkoutUrl, order);
  }
}
