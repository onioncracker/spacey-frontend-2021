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
  userRole = this.tokenStorageService.getRole();
  isUser = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  private isUserRole(): boolean {
    if (this.userRole === 'USER') {
      return true;
    } else if (this.userRole === null) {
      return true;
    }
    return false;
  }

  routeToCheckout() {
    this.router.navigateByUrl(routeUrls.checkout);
  }

  routeToHomepage(sex: string) {
    this.router.navigate([routeUrls.homepage]);
  }

  routeToPopular() {
    this.router.navigateByUrl(routeUrls.popular);
  }

  routeToProductCatalog(sex: string) {
    this.router.navigate([routeUrls.productCatalog], {
      queryParams: { sex: sex },
    });
  }

  routeToAuctions() {
    this.router.navigateByUrl(routeUrls.auctionCatalog);
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
    this.isUser = this.isUserRole();
  }
}
