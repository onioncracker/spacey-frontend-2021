import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../store/models/product.model';
import { ProductService } from '../../store/service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../store/service/cart.service';
import { CompareService } from '../../store/service/comparison/compare.service';
import { EditCartModel } from '../../store/models/edit-cart.model';
import { SizeModel } from '../../store/models/size.model';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { DialogService } from '../../store/service/dialog/dialog.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: ProductModel;
  chosenSize: number | undefined;
  isUser = false;
  isProductManager = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private productService: ProductService,
    private compareService: CompareService,
    private dialogService: DialogService,
    private cartService: CartService,
    private route: ActivatedRoute
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
    if (this.chosenSize == undefined) {
      this.dialogService.openMessage(
        ' Choose size of product to add ',
        ' Close '
      );
      return;
    }
    const productToAdd = {
      productId: this.product.id,
      sizeId: this.chosenSize,
      amount: 1,
    } as EditCartModel;

    if (this.cartService.isAuthorised()) {
      this.cartService.addProductToCart(productToAdd).subscribe(() => {
        this.dialogService.openMessage(
          ' Product added to your cart ',
          ' Close '
        );
      });
    } else {
      this.cartService.checkProduct(productToAdd).subscribe(() => {
        this.cartService.addProductToUnauthorizedCart(productToAdd);
        this.dialogService.openMessage(
          ' Product added to your cart ',
          ' Close '
        );
      });
    }
  }

  addProductToCompare(product: ProductModel): void {
    this.compareService.addProductToCompare(product);
  }

  getUserRole(): void {
    const userRole = this.tokenStorageService.getRole();
    switch (userRole) {
      case null:
      case 'USER':
        this.isUser = true;
        break;
      case 'PRODUCT_MANAGER':
        this.isProductManager = true;
        break;
    }
  }

  ngOnInit() {
    this.getUserRole();
    this.getProduct();
  }
}
