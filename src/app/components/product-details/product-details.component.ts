import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../store/models/product.model';
import { ProductService } from '../../store/service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../store/service/cart.service';
import { CompareService } from '../../store/service/comparison/compare.service';
import { EditCartModel } from '../../store/models/edit-cart.model';
import { SizeModel } from '../../store/models/size.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: ProductModel;
  chosenSize: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private compareService: CompareService,
    private cartService: CartService
  ) {}

  getProduct() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }

  chooseSize(size: SizeModel) {
    this.chosenSize = size.id;
  }

  addToCart() {
    const productToAdd = {
      productId: this.product.id,
      sizeId: this.chosenSize,
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

  addProductToCompare(product: ProductModel) {
    this.compareService.addProductToCompare(product);
  }

  ngOnInit() {
    this.getProduct();
  }
}
