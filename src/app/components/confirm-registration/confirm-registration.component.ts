import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../store/service/auth/AuthService';
import { routeUrls } from '../../../environments/router-manager';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css'],
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  private token: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      console.log(params['token']);
      this.token = params['token'];
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  sendToken(): void {
    this.authService.confirmRegistration(this.token).subscribe(
      (response) => {
        this.router.navigateByUrl(routeUrls.login);
      },
      (error) => {
        alert('Confirming failed. Try again');
        console.error(error);
      }
    );
  }
}
