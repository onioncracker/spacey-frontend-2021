import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {
  private manageProductsUrl = `${environment.url}/api/v1/product/all`;

  constructor(
    private  http: HttpClient,
  ) { }

  getAllProducts(): Observable<any>{
    return this.http.get(this.manageProductsUrl);
  }
}
