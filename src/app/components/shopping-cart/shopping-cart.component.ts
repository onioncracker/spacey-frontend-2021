import { Component, OnInit } from '@angular/core';
import { CartService } from '../../store/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductForCartModel } from '../../store/models/product-for-cart.model';
import { EditCartModel } from '../../store/models/edit-cart.model';

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

  addProduct(product: ProductForCartModel) {
    const productToAdd = {
      productId: product.id,
      sizeId: product.sizeId,
      amount: 1,
    } as EditCartModel;
    if (this.cartService.isAuthorised()) {
      this.cartService
        .addProductToCart(productToAdd)
        .subscribe((response) => {});
    } else {
      this.cartService.checkProduct(productToAdd).subscribe((response) => {
        this.cartService.addProductToUnauthorizedCart(productToAdd);
      });
    }
    window.alert('product added to cart!');
  }

  substractProduct(product: ProductForCartModel) {
    const productToSubstract = {
      productId: product.id,
      sizeId: product.sizeId,
      amount: 1,
    } as EditCartModel;
    if (this.cartService.isAuthorised()) {
      this.cartService
        .removeProductFromCart(productToSubstract)
        .subscribe((response) => {});
    } else {
      const productToCheck = {
        productId: product.id,
        sizeId: product.sizeId,
        amount: product.amount - 1,
      } as EditCartModel;
      this.cartService.checkProduct(productToCheck).subscribe((response) => {
        this.cartService.removeProductFromUnauthorizedCart(productToSubstract);
      });
    }
    window.alert('product added to cart!');
  }

  deleteProduct() {}
}
