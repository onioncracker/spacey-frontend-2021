import { Component, OnInit } from '@angular/core';
import { CartService } from '../../store/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductForCartModel } from '../../store/models/product-for-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  products: ProductForCartModel[] = [];
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
    this.cartService.getProducts().subscribe((response) => {
      this.products = response.body!;
      this.isProductsLoaded = true;
      console.log('Cart: data loaded');
    });
  }

  deleteProduct() {}
}
