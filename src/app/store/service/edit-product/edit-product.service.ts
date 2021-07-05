import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditProduct } from '../../models/edit-product';

@Injectable({
  providedIn: 'root',
})
export class EditProductService {
  private editProductUrl = `${environment.url}/api/v1/product`;
  private deleteProductUrl = `${environment.url}/api/v1/product/cancel`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.editProductUrl}/${id}`);
  }

  deleteProductById(id: number): Observable<any> {
    return this.http.delete(`${this.deleteProductUrl}/${id}`, this.httpOptions);
  }

  updateProductById(editProductData: EditProduct, productId): Observable<any> {
    return this.http
      .put(
        `${this.editProductUrl}/edit/${productId}`,
        editProductData,
        this.httpOptions
      )
      .pipe();
  }
}
