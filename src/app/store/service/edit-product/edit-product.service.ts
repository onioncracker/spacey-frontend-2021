import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditProduct } from '../../models/editProduct';

@Injectable({
  providedIn: 'root',
})
export class EditProductService {
  private editProductUrl = `${environment.url}/api/v1/product`;
  private deleteProductUrl = `${environment.url}/api/v1/product/cancel/{id}`;
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

  updateProductById(editProductData: EditProduct): Observable<any> {
    return this.http
      .put(
        `${this.editProductUrl}/edit/{id}`,
        editProductData,
        this.httpOptions
      )
      .pipe();
  }

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return(error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }
  // private log(message: string) {
  //   this.messageService.add(`EditProductService: ${message}`);
  // }
}
