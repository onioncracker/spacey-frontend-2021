import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../store/service/profile.service';
import { EmployeeProfileModel } from '../../store/models/employee-profile.model';
import { ChangePassword } from '../../store/models/change-password.model';
import { routeUrls } from '../../../environments/router-manager';
import { Router } from '@angular/router';
import { DefaultErrorStateMatcher } from '../../store/service/DefaultErrorStateMatcher';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { validatorPatterns } from '../../../environments/validate-patterns';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  errorMatcher = new DefaultErrorStateMatcher();
  profileInfo?: EmployeeProfileModel;
  profileForm: FormGroup;

  dataLoaded = false;
  hideRepeat = true;
  hideOld = false;
  hideNew = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private profileService: ProfileService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      email: [''],
      secondName: [''],
      phoneNumber: [''],
      role: [''],
      status: [''],
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

  ngOnInit(): void {
    this.loadProfileInfo();
    this.profileForm.controls.firstName.disable();
    this.profileForm.controls.email.disable();
    this.profileForm.controls.secondName.disable();
    this.profileForm.controls.phoneNumber.disable();
    this.profileForm.controls.role.disable();
    this.profileForm.controls.status.disable();
  }

  onSubmit(): void {
    this.changePassword();
  }

  private changePassword(): void {
    const newPassData = {
      oldPassword: this.profileForm.get('passwordOld')?.value,
      newPassword: this.profileForm.get('passwordNew')?.value,
      newPasswordRepeat: this.profileForm.get('passwordRepeat')?.value,
    } as ChangePassword;

    this.profileService.changePassword(newPassData).subscribe(
      () => {
        this.dialogService.openMessage(
          ' Your password has been changed ',
          ' Close '
        );
      },
      (error) => {
        if (error.status == 400) {
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

  private loadProfileInfo(): void {
    this.profileService.getEmployeeInfo().subscribe(
      (response) => {
        const data = response.body;
        this.profileInfo = data!;
        this.dataLoaded = true;
      },
      (error) => {
        if (error.status == 404) {
          console.error(error);
          this.dialogService.openMessage(
            ' Something went wrong while authorizing user. Try again ',
            ' Close '
          );
          this.logout();
        } else {
          console.error(error);
          this.dialogService.openMessage(
            ' Something went wrong. Try again ',
            ' Close '
          );
        }
      }
    );
  }

  logout(): void {
    this.profileService.logOut();
    this.router.navigateByUrl(routeUrls.login);
  }
}
