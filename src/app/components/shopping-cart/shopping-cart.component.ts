import { Component, OnInit } from '@angular/core';
import { CartService } from '../../store/service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductForCartModel } from '../../store/models/product-for-cart.model';
import { EditCartModel } from '../../store/models/edit-cart.model';
import { routeUrls } from '../../../environments/router-manager';
import { HeaderTitleService } from '../../store/service/header/header-title.service';
import { DialogService } from '../../store/service/dialog/dialog.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  products: ProductForCartModel[] = [];
  isProductsLoaded = false;
  checkoutAvailable = false;
  overallPrice = 0;

  constructor(
    private headerTitleService: HeaderTitleService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.headerTitleService.setTitle('shopping cart');
    this.loadData();
  }

  loadData(): void {
    this.getProducts();
    this.checkoutAvailable = this.cartService.checkAvailability(this.products);
    this.overallPrice = this.cartService.countTotalPrice(this.products);
  }

  getProducts(): void {
    console.log('loading products');
    this.cartService.getProducts().subscribe(
      (response) => {
        this.products = response.body!;
        this.isProductsLoaded = true;
        console.log('Cart: data loaded');
      },
      (error) => {
        console.error(error);
        console.log(error);
        this.dialogService.openMessage(
          'Something went wrong. Reload page or log in again',
          ' Close '
        );
      }
    );
  }

  addProduct(product: ProductForCartModel) {
    const productToAdd = {
      productId: product.id,
      sizeId: product.sizeId,
      amount: 1,
    } as EditCartModel;

    if (this.cartService.isAuthorised()) {
      this.cartService.addProductToCart(productToAdd).subscribe(() => {
        this.loadData();
      });
    } else {
      this.cartService.checkProduct(productToAdd).subscribe((response) => {
        this.cartService.addProductToUnauthorizedCart(productToAdd);
        this.loadData();
      });
    }
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
        .subscribe((response) => {
          this.loadData();
        });
    } else {
      const productToCheck = {
        productId: product.id,
        sizeId: product.sizeId,
        amount: product.amount - 1,
      } as EditCartModel;

      this.cartService.checkProduct(productToCheck).subscribe(() => {
        this.cartService.removeProductFromUnauthorizedCart(productToSubstract);
        this.loadData();
      });
    }
  }

  goToCheckout() {
    this.cartService.saveCartForCheckout(this.products);
    this.router.navigateByUrl(routeUrls.checkout);
  }
}
