import { Component, OnInit } from '@angular/core';
import { Product } from '../../store/models/product';
import { ProductService } from '../../store/service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../store/service/cart/CartService';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  getProduct() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart(product: Product) {
    // this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
  ngOnInit() {
    this.getProduct();
  }
}
