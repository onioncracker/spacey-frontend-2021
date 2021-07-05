import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeUrls } from '../../../environments/router-manager';
import { AuthService } from '../../store/service/auth/auth.service';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  isUser = false;
  isAuthorizedUser = false;
  isCourier = false;
  isProductManager = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  getUserRole(): void {
    const userRole = this.tokenStorageService.getRole();
    switch (userRole) {
      case null:
        this.isUser = true;
        break;
      case 'USER':
        this.isAuthorizedUser = true;
        break;
      case 'COURIER':
        this.isCourier = true;
        break;
      case 'PRODUCT_MANAGER':
        this.isProductManager = true;
        break;
    }
  }

  routeToCheckout() {
    this.router.navigateByUrl(routeUrls.checkout);
  }

  routeToHomepage(sex: string) {
    this.router.navigate([routeUrls.homepage]);
  }

  routeToProductCatalog(sex: string) {
    this.router.navigate([routeUrls.productCatalog], {
      queryParams: { sex: sex },
    });
  }

  routeToAuctions() {
    this.router.navigateByUrl(routeUrls.auctionCatalog);
  }

  routeToAddProduct() {
    this.router.navigateByUrl(routeUrls.addProduct);
  }

  routeToAddAuction() {
    this.router.navigateByUrl(routeUrls.addAuction);
  }

  routeToCourierOrders() {
    this.router.navigateByUrl(routeUrls.deliveries);
  }

  routeToCart() {
    this.router.navigateByUrl(routeUrls.shoppingCart);
  }

  routeToProfile() {
    if (this.authService.isAuthorised()) {
      this.router.navigateByUrl(routeUrls.profile);
    } else {
      this.router.navigateByUrl(routeUrls.login);
    }
  }

  ngOnInit() {
    this.getUserRole();
  }
}
