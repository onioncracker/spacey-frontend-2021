import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = `${environment.url}/products`;

  constructor(private http: HttpClient) {}

  getAllProductsInPage(): Observable<any> {
    return this.http.get(this.productUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.productUrl}/${id}`);
  }
}
