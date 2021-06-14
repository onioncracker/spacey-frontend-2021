import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditProductService {
  private editProductUrl = `${environment.url}/api/v1/product/edit`;
  private deleteProductUrl = `${environment.url}/api/v1/product/cancel/{id}`;

  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.editProductUrl}/${id}`);
  }

  deleteProductById(id: number): Observable<any> {
    return this.http.delete(`${this.deleteProductUrl}/${id}`);
  }
}
