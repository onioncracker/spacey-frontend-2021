import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './store/service/auth/tokenStorageService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title: 'spacey' | undefined;
  private roles: string[] | undefined;
  public authority: string | undefined;

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      // @ts-ignore
      this.roles.every((role) => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return;
        }
      });
    }
  }
}
