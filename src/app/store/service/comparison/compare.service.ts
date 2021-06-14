import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {DeleteCompareProduct} from "../../models/deleteCompareProduct";
import {Comparison} from "../../models/comparison";

@Injectable({
  providedIn: 'root',
})
export class CompareService {

  private comparisonURL = `${environment.url}/api/v1/products/compared-products`;

  constructor(private http: HttpClient) { }

  getAllCompareProduct(id: number) : Observable<any> {
    return this.http.get(`${this.comparisonURL}/${id}`);
  }

  deleteCompareProduct(deleteCompareData: DeleteCompareProduct) : Observable<any> {
    return this.http.delete(this.comparisonURL);
  }
}
