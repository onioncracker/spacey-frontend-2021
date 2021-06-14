import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AddProduct} from "../../models/addProduct";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  private addProductUrl = `${environment.url}/api/v1/product/add`;
  private httpOptions = { observe: 'response' as const };
  private  allMaterialsUrl = `${environment.url}/api/v1/material/all`;
  private allColorsUrl = `${environment.url}/api/v1/color/all`;
  private allSizesUrl = `${environment.url}/api/v1/size/all`;
  private allCategoryUrl = `${environment.url}/api/v1/category/all`;


  constructor(private http: HttpClient) { }

  addNewProduct (
    addProductData: AddProduct
  ): Observable <any> {
    return this.http.post<AddProduct>(
      this.addProductUrl,
      addProductData,
      this.httpOptions
    );
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
