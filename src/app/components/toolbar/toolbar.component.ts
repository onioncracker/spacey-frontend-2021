import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../store/service/auth/tokenStorageService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToCheckout() {
    this.router.navigateByUrl("/checkout");
  }
}
