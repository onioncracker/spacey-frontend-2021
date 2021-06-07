import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../store/service/auth/tokenStorageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  routeToCheckout() {
    this.router.navigateByUrl('/checkout');
  }
}
