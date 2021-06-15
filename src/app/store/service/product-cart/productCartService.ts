import { Injectable } from '@angular/core';
import {ProductCartModel} from "../../models/ProductCartModel";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = [];
  addToCart(product: Product) {
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  clearCart() {
    this.products = [];
    return this.products;
  }
  constructor() {}

}
