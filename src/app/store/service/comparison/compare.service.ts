import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductModel } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { DialogService } from '../dialog/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private comparisonURL = `${environment.url}/api/v1/products/compared-products`;
  private comparisonLocalStorage = 'comparisonArray';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}

  getAllCompareProduct(): Observable<any> {
    return this.http.get(`${this.comparisonURL}`);
  }

  isUserLogIn(): boolean {
    return Boolean(sessionStorage.getItem('token'));
  }

  deleteCompareProduct(productId: number): Observable<number> {
    return this.http.delete<number>(`${this.comparisonURL}/${productId}`);
  }

  deleteLocalStorageProduct(id: number) {
    let comparison: ProductModel[];
    comparison = JSON.parse(
      <string>localStorage.getItem(this.comparisonLocalStorage)
    );
    comparison = comparison.filter((product) => product.id !== id);
    localStorage.setItem(
      this.comparisonLocalStorage,
      JSON.stringify(comparison)
    );
  }

  addProductToCompareSessionStorage(productData: ProductModel) {
    if (!localStorage.getItem(this.comparisonLocalStorage)) {
      let comparison: ProductModel[] = [productData];
      localStorage.setItem(
        this.comparisonLocalStorage,
        JSON.stringify(comparison)
      );
    } else {
      let comparison: ProductModel[] = JSON.parse(
        <string>localStorage.getItem(this.comparisonLocalStorage)
      );
      if (comparison.length >= 4) {
        this.dialogService.openMessage(
          'You can`t add more then 4 product-details',
          'Close'
        );
      } else {
        if (
          comparison.filter((product) => product.id == productData.id).length >=
          1
        ) {
          this.dialogService.openMessage('Product already compared', 'Close');
        } else {
          comparison.push(productData);
          localStorage.setItem(
            this.comparisonLocalStorage,
            JSON.stringify(comparison)
          );
          this.dialogService.openMessage(
            'Successful added to comparison',
            'Close'
          );
        }
      }
    }
  }

  getAllComparedProductsFromLocalStorage() {
    return JSON.parse(
      <string>localStorage.getItem(this.comparisonLocalStorage)
    );
  }

  addProductToCompareServer(productId: number) {
    return this.http
      .post(`${this.comparisonURL}/${productId}`, productId)
      .pipe(
        catchError((error) => {
          this.dialogService.openMessage(error.error.message, 'Close');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response !== null) {
          this.dialogService.openMessage(
            'Successful added to comparison',
            'Close'
          );
        }
      });
  }

  addProductToCompare(comparison: ProductModel) {
    if (this.isUserLogIn()) {
      this.addProductToCompareServer(comparison.id);
    } else {
      this.addProductToCompareSessionStorage(comparison);
    }
  }
}
