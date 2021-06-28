import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routeUrls } from '../../../environments/router-manager';
import { AuthService } from '../../store/service/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(private router: Router, public authService: AuthService) {}

  routeToCheckout() {
    this.router.navigateByUrl(routeUrls.checkout);
  }

  routeToHomepage(sex: string) {
    this.router.navigate([routeUrls.homepage], { queryParams: { sex: sex } });
  }

  routeToPopular() {
    this.router.navigateByUrl(routeUrls.popular);
  }

  routeToProductsCatalog(sex: string) {
    this.router.navigate([routeUrls.productsCatalog], {
      queryParams: { sex: sex },
    });
  }

  routeToAuctions() {
    this.router.navigateByUrl(routeUrls.auctions);
  }

  routeToCart() {
    this.router.navigateByUrl(routeUrls.checkout);
  }

  routeToProfile() {
    if (this.authService.isAuthorised()) {
      this.router.navigateByUrl(routeUrls.userProfile);
    } else {
      this.router.navigateByUrl(routeUrls.login);
    }
  }
}
