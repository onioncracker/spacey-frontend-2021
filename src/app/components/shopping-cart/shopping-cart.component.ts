import { Component, OnInit } from '@angular/core';
import {CartService} from "../../store/service/cart/CartService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  products = this.cartService.getProducts();

  constructor(private route: ActivatedRoute,
              private cartService: CartService) { }
  deleteProduct(){

  }
}
