import { Component } from '@angular/core';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isUser = false;
  isEmployee = false;
  isAdmin = false;

  constructor(private storageService: TokenStorageService) {
    const role: string = storageService.getRole();
    switch (role) {
      case 'USER':
        this.isUser = true;
        break;
      case 'COURIER':
      case 'PRODUCT_MANAGER':
        this.isEmployee = true;
        break;
      case 'ADMIN':
        this.isAdmin = true;
        break;
    }
  }
}
