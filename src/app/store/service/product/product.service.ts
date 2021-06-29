import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPrice, PricesMock } from '../../models/price.model';
import { ProductModel } from '../../models/product.model';
import { CategoryModel } from '../../models/category.model';
import { ColorModel } from '../../models/color.model';
import { ISorting, SortingMock } from '../../models/sorting.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = `${environment.url}/api/v1/products`;
  private colorUrl = `${environment.url}/api/v1/color/all`;
  private categoryUrl = `${environment.url}/api/v1/category/all`;
  private filterPricesStream = new BehaviorSubject<IPrice[]>(PricesMock);
  private sortingStream = new BehaviorSubject<ISorting[]>(SortingMock);

  constructor(private http: HttpClient) {}

  getProductsByQuery(queryString: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.productUrl}${queryString}`);
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.categoryUrl);
  }

  getColors(): Observable<ColorModel[]> {
    return this.http.get<ColorModel[]>(this.colorUrl);
  }

  getPrices(): Observable<IPrice[]> {
    return this.filterPricesStream.asObservable();
  }

  getSorting(): Observable<ISorting[]> {
    return this.sortingStream.asObservable();
  }

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.productUrl}/${id}`);
  }
}
