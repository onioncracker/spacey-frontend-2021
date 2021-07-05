import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultErrorStateMatcher } from '../../store/service/DefaultErrorStateMatcher';
import { AuthService } from '../../store/service/auth/auth.service';
import { Router } from '@angular/router';
import { routeUrls } from '../../../environments/router-manager';
import { DialogService } from '../../store/service/dialog/dialog.service';

@Component({
  selector: 'app-email-for-recover-pass',
  templateUrl: './email-for-recover-pass.component.html',
  styleUrls: ['./email-for-recover-pass.component.css'],
})
export class EmailForRecoverPassComponent {
  emailForm: FormGroup;
  errorMatcher = new DefaultErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
    });
  }

  onSubmit() {
    this.authService
      .sendEmailForRecover(this.emailForm.get('email')?.value)
      .subscribe(
        () => {
          this.dialogService.openMessage(
            ' Check your email for recover link ',
            ' Close '
          );
          this.router.navigateByUrl(routeUrls.login);
        },
        (error) => {
          if (error.status == 404) {
            this.dialogService.openMessage(
              ' Email not found in database. Try again ',
              ' Close '
            );
          } else {
            this.dialogService.openMessage(
              ' Something went wrong. Try again ',
              ' Close '
            );
          }
        }
      );
  }
}
