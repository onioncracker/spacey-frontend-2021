import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorPageService {
  constructor(private router: Router) {}

  openErrorPage(errorMessage: string) {
    this.router.navigate(['error-page'], {
      state: { errorMessage: errorMessage },
    });
  }
}
