import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AddProduct} from "../../models/add-product";
import {Observable} from "rxjs";
import {CategoryColorMaterialsModel} from "../../models/category-color-materials.model";

@Injectable({
  providedIn: 'root'
})
export class CustomizationService {
  private customizationUrl = `${environment.url}/api/v1`;

  constructor(private http: HttpClient) {
  }

  addNewColor(color: CategoryColorMaterialsModel): Observable<CategoryColorMaterialsModel> {
    return this.http.post<CategoryColorMaterialsModel>(`${this.customizationUrl}/color/add`, color);
  }

  saveColor(color: CategoryColorMaterialsModel): Observable<CategoryColorMaterialsModel> {
    return this.http.put<CategoryColorMaterialsModel>(`${this.customizationUrl}/color/edit/${color.id}`, color);
  }

  deleteColor(colorId: number): Observable<number> {
    return this.http.delete<number>(`${this.customizationUrl}/color/delete/${colorId}`)
  }

}
