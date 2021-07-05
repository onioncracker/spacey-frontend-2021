import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../store/service/auth/auth.service';
import { routeUrls } from '../../../environments/router-manager';
import { DialogService } from '../../store/service/dialog/dialog.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css'],
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  private token: string = '';
  tokenIsOk: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  sendToken(): void {
    this.authService.confirmRegistration(this.token).subscribe(
      () => {
        this.router.navigateByUrl(routeUrls.login);
      },
      (error) => {
        if (error.status == 400) {
          this.dialogService.openMessage(
            ' Your link has been expired. Try with new one ',
            ' Close '
          );
          this.tokenIsOk = false;
        }
        console.error(error);
      }
    );
  }

  resendToken(): void {
    this.authService.resendRegistration(this.token).subscribe(
      () => {
        this.tokenIsOk = true;
      },
      (error) => {
        this.dialogService.openMessage(
          ' Something went wrong. Try again ',
          ' Close '
        );
        console.error(error);
      }
    );
  }
}
