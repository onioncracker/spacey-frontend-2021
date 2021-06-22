import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../../components/dialog-message/dialog-message.component';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  private comparisonURL = `${environment.url}/api/v1/products/compared-products`;
  private comparisonLocalStorage = 'comparisonArray';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

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
    let comparison: Product[];
    comparison = JSON.parse(
      <string>localStorage.getItem(this.comparisonLocalStorage)
    );
    comparison = comparison.filter((product) => product.id !== id);
    localStorage.setItem(
      this.comparisonLocalStorage,
      JSON.stringify(comparison)
    );
  }

  addProductToCompareSessionStorage(productData: Product) {
    if (!localStorage.getItem(this.comparisonLocalStorage)) {
      let comparison: Product[] = [productData];
      localStorage.setItem(
        this.comparisonLocalStorage,
        JSON.stringify(comparison)
      );
    } else {
      let comparison: Product[] = JSON.parse(
        <string>localStorage.getItem(this.comparisonLocalStorage)
      );
      if (comparison.length >= 4) {
        this.openDialog('You can`t add more then 4 product');
      } else {
        if (
          comparison.filter((product) => product.id == productData.id).length >=
          1
        ) {
          this.openDialog('Product already compared');
        } else {
          comparison.push(productData);
          localStorage.setItem(
            this.comparisonLocalStorage,
            JSON.stringify(comparison)
          );
          this.openDialog('Successful added to comparison');
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
          this.openDialog(error.error.message);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response !== null) {
          this.openDialog('Successful added to comparison');
        }
      });
  }

  addProductToCompare(comparison: Product) {
    if (this.isUserLogIn()) {
      this.addProductToCompareServer(comparison.id);
    } else {
      this.addProductToCompareSessionStorage(comparison);
    }
  }

  openDialog(title: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      messageTitle: title,
    };
    this.dialog.open(DialogMessageComponent, dialogConfig);
  }

  handleError(error: any) {
    console.error(error);
    console.log(`${error.error.message}`);
  }
}
