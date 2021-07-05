import { Component, OnInit } from '@angular/core';
import CheckoutService from '../../store/service/checkout/checkout.service';
import { CheckoutOrder } from '../../store/models/checkout-order';
import { CheckoutDto } from '../../store/models/checkout';
import CheckoutItem from '../../store/models/CheckoutItem';
import { Delivery } from '../../store/models/delivery';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { AuthService } from '../../store/service/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../store/service/cart.service';
import { ProductForCartModel } from '../../store/models/product-for-cart.model';
import { Router } from '@angular/router';
import { routeUrls } from '../../../environments/router-manager';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products!: CheckoutItem[];
  order!: CheckoutOrder;
  isUserLogin = false;
  isFormValid = false;
  edit = false;
  options = {
    title: 'Do checkout?',
    message: 'Order will be delivered soon',
    cancelText: 'CANCEL',
    confirmText: 'YES',
  };

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private authService: AuthService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  getPersonalInformation(personalInformationForm: FormGroup) {
    let personalInformation = personalInformationForm.value;
    this.isFormValid = personalInformationForm.valid;
    this.order.ordererFirstName = personalInformation.firstName;
    this.order.ordererLastName = personalInformation.lastName;
    this.order.phoneNumber = personalInformation.phoneNumber;
    this.order.email = personalInformation.email;
    this.order.city = personalInformation.city;
    this.order.street = personalInformation.street;
    this.order.house = personalInformation.house;
    this.order.apartment = personalInformation.apartment;
  }

  getComment(comment: string) {
    this.order.commentOrder = comment;
  }

  getDelivery(delivery: Delivery) {
    this.order.dateDelivery = delivery.date;
    this.order.noContact = delivery.noContact;
    this.order.doNotDisturb = delivery.doNotDisturb;
  }

  onCheckout() {
    if (!this.isFormValid) {
      this.snackBar.open(
        'Please, specify all required personal information',
        '',
        {
          duration: 2000,
        }
      );
      // @ts-ignore
      document.getElementById('personal-information').scrollIntoView();
      // @ts-ignore
      document.getElementById('edit-personal-info-btn').click(() => {});
    } else {
      this.dialogService.openConfirm(this.options);
      this.dialogService.confirmed().subscribe((confirmed) => {
        if (confirmed) {
          if (this.isUserLogin) {
            this.checkoutService.makeOrderAuthorized(this.order).subscribe(
              () => {
                this.dialogService.openMessage(
                  'Thanks for purchase!',
                  'Close'
                );
                this.navigateToMainPage();
              });
          } else {
            this.checkoutService.makeOrderAnonymous(this.order).subscribe(
              () => {
                this.dialogService.openMessage(
                  'Thanks for purchase!',
                  'Close'
                );
                this.navigateToMainPage();
              });
          }
        }
      });
    }
  }

  navigateToMainPage() {
    this.router.navigateByUrl(routeUrls.homepage);
  }

  getProducts() {
    return JSON.parse(<string>sessionStorage.getItem('shoppingCart'));
  }

  ngOnInit(): void {
    this.isUserLogin = this.authService.isAuthorised();
    if (!this.isUserLogin) {
      this.cartService.getProducts().subscribe((data) => {
        // @ts-ignore
        this.products = data.body;
        this.order = new CheckoutOrder(
          // @ts-ignore
          new CheckoutDto(data.body, 0, '', '', '', '', '', '', '', '')
        );
        // @ts-ignore
        this.order.products = data.body;
        // @ts-ignore
        this.countPriceForProduct(this.products);
        // @ts-ignore
        this.order.overallPrice = this.countTotalPrice(data.body);
        this.order.products = this.getProducts();
      });
    } else {
      this.checkoutService.getCheckout().subscribe((checkout: CheckoutDto) => {
        this.order = new CheckoutOrder(checkout);
        this.products = checkout.products;
      });
    }
  }

  countTotalPrice(products: ProductForCartModel[]): number {
    return products.reduce((sum, { overallPrice }) => sum + overallPrice, 0);
  }

  countPriceForProduct(products: ProductForCartModel[]): void {
    products.forEach((item) => {
      item.overallPrice = item.amount * item.overallPrice;
    });
  }
}
