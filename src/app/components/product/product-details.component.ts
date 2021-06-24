import { Component, OnInit } from '@angular/core';
import { Product } from '../../store/models/product';
import { ProductService } from '../../store/service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../store/service/cart/CartService';
import { CompareService } from '../../store/service/comparison/compare.service';
import { EditCartModel } from '../../store/models/EditCartModel';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  choosedSize: string | undefined = 'S'; // TODO change string to id

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private compareService: CompareService
  ) {}

  getProduct() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart() {
    const productToAdd = {
      productId: this.product.id,
      size: 1, // TODO change to choosedSize
      amount: 1,
    } as EditCartModel;

    if (this.cartService.isAuthorised()) {
      this.cartService.addProductToCart(productToAdd).subscribe((response) => {
        window.alert('product added to cart!');
      });
    } else {
      this.cartService.checkProduct(productToAdd).subscribe((response) => {
        this.cartService.addProductToUnauthorizedCart(productToAdd);
        window.alert('product added to cart!');
      });
    }
  }

  addProductToCompare(product: Product) {
    this.compareService.addProductToCompare(product);
  }

  ngOnInit() {
    this.getProduct();
  }
}
