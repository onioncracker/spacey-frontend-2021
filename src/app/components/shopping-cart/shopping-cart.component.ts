import { Component, OnInit } from '@angular/core';
import { CartService } from '../../store/service/cart/CartService';
import { ActivatedRoute } from '@angular/router';
import { ProductForCartModel } from '../../store/models/ProductForCartModel';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  products: ProductForCartModel[] | undefined;
  isProductsLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    console.log('loading products');
    this.cartService
      .getProducts()
      .subscribe(
        (response) => {
          this.products = response;
          this.isProductsLoaded = true;
          console.log('Cart: data loaded');
        },
        (error) => {
          console.warn('Fetching products in cart failed');
          if (error.status === 401) {
            console.log('Unauthorised access');
          } else {
            alert('Виникла помилкаю Спробуйте ще раз');
            console.error(error);
          }
        }
      )
      .unsubscribe();
  }

  deleteProduct() {}
}
