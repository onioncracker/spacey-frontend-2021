import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import Order from "../../models/order";
import OrderDetails from "../../models/orderDetails";
import {OrderStatus} from "../../models/status";

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

  updateOrderStatus(orderStatus: OrderStatus):Observable<OrderStatus> {
    return this.http.put<OrderStatus>(`${this.ordersUrl}/orders`, orderStatus)
  }
}

