import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './store/service/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title: 'spacey' | undefined;
  private roles: string[] | undefined;
  public authority: string | undefined;

  constructor(private tokenStorage: TokenStorageService) {}
}
