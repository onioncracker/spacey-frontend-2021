import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {EditProduct} from "../../models/editProduct";

@Injectable({
  providedIn: 'root',
})
export class EditProductService {
  private editProductUrl = `${environment.url}/api/v1/product/edit/{id}`;
  private deleteProductUrl = `${environment.url}/api/v1/product/cancel/{id}`;
  private httpOptions = { observe: 'response' as const };

  constructor(private http: HttpClient) {}

  getProductById(id: number, editProductData: EditProduct): Observable<any> {
    return this.http.put<any>(`${this.editProductUrl}`, editProductData, this.httpOptions);
  }

  deleteProductById(id: number): Observable<any> {
    return this.http.delete(`${this.deleteProductUrl}/${id}`);
  }
}
