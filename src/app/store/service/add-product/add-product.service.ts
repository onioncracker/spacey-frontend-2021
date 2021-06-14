import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AddProduct } from '../../models/addProduct';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  private addProductUrl = `${environment.url}/api/v1/product/add`;
  private httpOptions = { observe: 'response' as const };
  private allMaterialsUrl = `${environment.url}/api/v1/material/all`;
  private allColorsUrl = `${environment.url}/api/v1/color/all`;
  private allSizesUrl = `${environment.url}/api/v1/size/all`;
  private allCategoryUrl = `${environment.url}/api/v1/category/all`;
  private imgUrl = `${environment.url}/api/v1/images`;

  constructor(private http: HttpClient) {}

  addNewProduct(addProductData: AddProduct): Observable<any> {
    console.log(this.httpOptions);
    return this.http.post<AddProduct>(
      this.addProductUrl,
      addProductData,
      this.httpOptions
    );
  }

  public uploadImage(image: File, id: number): Subscription {
    const formData = new FormData();
    formData.append('image', image);
    return this.http
      .post(`${this.imgUrl}/${id}`, formData)
      .subscribe((response) => {
        console.log(response);
        alert('Uploaded Successfully.');
      });
  }

  getAllMaterials(): Observable<any> {
    return this.http.get(`${this.allMaterialsUrl}`);
  }

  getAllColors(): Observable<any> {
    return this.http.get(`${this.allColorsUrl}`);
  }

  getAllSizes(): Observable<any> {
    return this.http.get(`${this.allSizesUrl}`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${this.allCategoryUrl}`);
  }
}
