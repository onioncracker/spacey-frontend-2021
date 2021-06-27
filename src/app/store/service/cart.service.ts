import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ProductForCartModel } from '../models/product-for-cart.model';
import { endpointUrls } from '../../../environments/endpoint-routes-manager';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { EditCartModel } from '../models/edit-cart.model';
import { TokenStorageService } from './auth/token-storage.service';
import { sessionStorageKeys } from '../../../environments/session-storage-manager';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getCartUrl = `${environment.url}${endpointUrls.apiPrefix}${endpointUrls.getCart}`;
  addProductUrl =
    environment.url + endpointUrls.apiPrefix + endpointUrls.addProduct;
  removeProductUrl =
    environment.url + endpointUrls.apiPrefix + endpointUrls.deleteProduct;
  checkProductUrl =
    environment.url + endpointUrls.apiPrefix + endpointUrls.checkProduct;
  getUnauthorizedCartUrl =
    environment.url + endpointUrls.apiPrefix + endpointUrls.getUnauthorizedCart;

  CART_KEY = sessionStorageKeys.CART_KEY;

  private httpOptions = { observe: 'response' as const };

  // private unauthorizedCart: EditCartModel[] = [];

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError('Сталася помилка. Перезавантажте сайт');
    } else {
      switch (error.status) {
        case 404:
          return throwError('Сталася помилка. Файл не знайдено');
        case 401:
          console.error('unauthorized access exception: ', error.message);
          return throwError('Authorization error. Try again');
        default:
          return throwError('Сталася помилка. Перезавантажте сайт');
      }
    }
  }

  getProducts(): Observable<HttpResponse<ProductForCartModel[]>> {
    if (this.tokenStorageService.isAuthorised()) {
      return this.http
        .get<ProductForCartModel[]>(this.getCartUrl, this.httpOptions)
        .pipe(catchError(this.handleError));
    } else {
      const unauthorizedCart = this.getUnauthorizedCart();
      return this.http
        .post<ProductForCartModel[]>(
          this.getUnauthorizedCartUrl,
          unauthorizedCart,
          this.httpOptions
        )
        .pipe(catchError(this.handleError));
    }
  }

  addProductToCart(data: EditCartModel): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(this.addProductUrl, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  removeProductFromCart(data: EditCartModel): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(this.removeProductUrl, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  checkProduct(data: EditCartModel): Observable<HttpResponse<any>> {
    return this.http
      .post(this.checkProductUrl, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addProductToUnauthorizedCart(productToAdd: EditCartModel): void {
    const cart = this.getUnauthorizedCart();
    let isInCart = false;
    for (let product of cart) {
      if (
        product.productId == productToAdd.productId &&
        product.sizeId == productToAdd.sizeId
      ) {
        product.amount += productToAdd.amount;
        isInCart = true;
        console.log('item is already in cart, amount increased');
      }
    }
    if (!isInCart) {
      cart.push(productToAdd);
      console.log('item has been added to local shopping cart');
    }
    this.saveUnauthorizedCart(cart);
    console.log(cart.toString());
  }

  removeProductFromUnauthorizedCart(productToAdd: EditCartModel): void {
    const cart = this.getUnauthorizedCart();
    let isInCart = false;
    for (let product of cart) {
      if (
        product.productId == productToAdd.productId &&
        product.sizeId == productToAdd.sizeId
      ) {
        product.amount -= productToAdd.amount;
        isInCart = true;
        console.log('item is already in cart, amount decreased');
      }
    }
    if (!isInCart) {
      // cart.(productToAdd); TODO remove item here
      console.log('item has been removed from local shopping cart');
    }
    this.saveUnauthorizedCart(cart);
  }

  getUnauthorizedCart(): EditCartModel[] {
    const result = JSON.parse(<string>sessionStorage.getItem(this.CART_KEY));
    console.log(
      'cart for unauthorized user successfully parsed from session storage'
    );
    if (result == null) {
      return [];
    }
    return result;
  }

  saveUnauthorizedCart(cart: EditCartModel[]): void {
    sessionStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    console.log(
      'cart for unauthorized user successfully saved to session storage'
    );
  }

  isAuthorised(): boolean {
    return this.tokenStorageService.isAuthorised();
  }

  private;
}
