import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {routeUrls} from "../../../environments/router-manager";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private router: Router) {
  }

  routeToProductCatalog(sex: string) {
    this.router.navigate([routeUrls.productCatalog], {
      queryParams: { sex: sex },
    });
  }


  goToAuctions() {
    this.router.navigateByUrl(routeUrls.auctionCatalog);
  }
}
