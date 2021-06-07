import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routeUrls } from '../../../environments/router-manager';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  routeToCheckout() {
    this.router.navigateByUrl(routeUrls.checkout);
  }

  routeToHomepage() {
    this.router.navigateByUrl(routeUrls.login);
  }

  routeToPopular() {
    this.router.navigateByUrl(routeUrls.popular);
  }

  routeToAccessories() {
    this.router.navigateByUrl(routeUrls.accessories);
  }

  routeToAuctions() {
    this.router.navigateByUrl(routeUrls.auctions);
  }
}
