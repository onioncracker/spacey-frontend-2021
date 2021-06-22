import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductForCartModel } from '../../models/ProductForCartModel';
import { endpointUrls } from '../../../../environments/endpoint-routes-manager';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getCartUrl = environment.url + endpointUrls.apiPrefix + endpointUrls.getCart;

  private httpOptions = { observe: 'response' as const };

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProducts(): Observable<ProductForCartModel[]> {
    return this.http.get<ProductForCartModel[]>(this.getCartUrl);
  }
}
