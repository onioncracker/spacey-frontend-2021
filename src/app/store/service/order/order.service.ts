import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import Order from "../../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = `${environment.url}/api/v1/profile/orders`;

  constructor(private http: HttpClient) {
  }

  findAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }
}

