import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import Order from "../../models/order";
import OrderDetails from "../../models/orderDetails";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = `${environment.url}/api/v1`;

  constructor(private http: HttpClient) {
  }

  findAllOrders(date: string): Observable<Order[]> {
    if (date == null) {
      return this.http.get<Order[]>(`${this.ordersUrl}/profile/orders`);
    } else {
      return this.http.get<Order[]>(`${this.ordersUrl}/profile/orders`, {
        params: new HttpParams()
          .set("date", date)
      });
    }
  }

  findOrderById(orderId: number): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(`${this.ordersUrl}/orders/${orderId}`)
  }

  updateOrderStatusConfirm(orderId: number):Observable<number> {
    return this.http.put<number>(`${this.ordersUrl}/orders/delivered/${orderId}`, orderId);
  }

  updateOrderStatusFail(orderId: number):Observable<number> {
    return this.http.put<number>(`${this.ordersUrl}/orders/fail/${orderId}`, orderId);
  }
}

