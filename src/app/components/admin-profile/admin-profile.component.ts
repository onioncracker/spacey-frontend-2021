import { Component } from '@angular/core';
import { ChangePassword } from '../../store/models/change-password.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultErrorStateMatcher } from '../../store/service/DefaultErrorStateMatcher';
import { Router } from '@angular/router';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { ProfileService } from '../../store/service/profile.service';
import { validatorPatterns } from '../../../environments/validate-patterns';
import { routeUrls } from '../../../environments/router-manager';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent {
  errorMatcher = new DefaultErrorStateMatcher();
  passwordForm: FormGroup;

  hideRepeat = true;
  hideOld = false;
  hideNew = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private profileService: ProfileService
  ) {
    this.passwordForm = this.formBuilder.group({
      passwordOld: [
        '',
        [
          Validators.required,
          Validators.pattern(validatorPatterns.passwordPattern),
        ],
      ],
      passwordNew: [
        '',
        [
          Validators.required,
          Validators.pattern(validatorPatterns.passwordPattern),
        ],
      ],
      passwordRepeat: [
        '',
        [
          Validators.required,
          Validators.pattern(validatorPatterns.passwordPattern),
        ],
      ],
    });
  }

  changePassword(): void {
    const newPassData = {
      oldPassword: this.passwordForm.get('passwordOld')?.value,
      newPassword: this.passwordForm.get('passwordNew')?.value,
      newPasswordRepeat: this.passwordForm.get('passwordRepeat')?.value,
    } as ChangePassword;
    this.profileService.changePassword(newPassData).subscribe(
      () => {
        this.dialogService.openMessage(
          ' Your password has been changed ',
          ' Close '
        );
      },
      (error) => {
        if (error.status == 400 || error.status == 401) {
          this.dialogService.openMessage(
            ' Repeated password does not match new password. Try again ',
            ' Close '
          );
          console.error(error);
        } else {
          this.dialogService.openMessage(
            ' Something went wrong. Try again ',
            ' Close '
          );
          console.error(error);
        }
      }
    );
  }

  logout(): void {
    this.profileService.logOut();
    this.router.navigateByUrl(routeUrls.login);
  }
}
