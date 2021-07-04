import { Component, ElementRef, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  order!: CheckoutOrder;
  products!: CheckoutItem[];
  isUserLogin = false;
  isFormValid = false;
  options = {
    title: 'Do checkout?',
    message: 'Order will be delivered soon',
    cancelText: 'CANCEL',
    confirmText: 'YES',
  };
  edit = false;

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
    console.log(delivery);
    this.order.dateDelivery = delivery.date;
    this.order.noContact = delivery.noContact;
    this.order.doNotDisturb = delivery.doNotDisturb;
  }

  onCheckout() {
    console.log(this.order);
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
          this.checkoutService
            .makeOrder(this.order)
            .subscribe((res) => alert(res));
        }
      });
    }
  }

  getProducts() {
    return JSON.parse(<string>sessionStorage.getItem('shoppingCart'));
  }

  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isUserLogin = this.authService.isAuthorised();
    if (!this.isUserLogin) {
      this.order = new CheckoutOrder(
        new CheckoutDto(this.products, 0, '', '', '', '', '', '', '', '')
      );
      this.cartService.getProducts().subscribe((data) => {
        // @ts-ignore
        this.order.products = data.body;
        // @ts-ignore
        this.products = data.body;
        console.log('products', this.products);
        // @ts-ignore
        this.countPriceForProduct(this.products);
        // @ts-ignore
        this.order.overallPrice = this.countTotalPrice(data.body);
      });
      this.order.products = this.getProducts();
    } else {
      this.checkoutService.getCheckout().subscribe((checkout: CheckoutDto) => {
        this.order = new CheckoutOrder(checkout);
        this.products = checkout.products;
        console.log(this.products);
      });
    }
  }

  countTotalPrice(products: ProductForCartModel[]): number {
    return products.reduce(
      (sum, { overallPrice, amount }) => sum + overallPrice,
      0
    );
  }

  countPriceForProduct(products: ProductForCartModel[]): void {
    products.forEach(function (item) {
      item.overallPrice = item.amount * item.overallPrice;
    });
  }
}
