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
import { UserProfile } from '../../store/models/user-profile.model';
import { EditUserProfile } from '../../store/models/edit-user-profile.model';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { Router } from '@angular/router';
import { routeUrls } from '../../../environments/router-manager';
import { ChangePassword } from '../../store/models/change-password.model';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { validatorPatterns } from '../../../environments/validate-patterns';

export class UserProfileErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userInfo?: UserProfile;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  errorMatcher = new UserProfileErrorStateMatcher();

  hideOld = true;
  hideNew = true;
  hideRepeat = true;

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      phoneNumber: [''],
      dateOfBirth: [''],
      email: [''],
      sex: [''],
      city: [''],
      street: [''],
      house: [''],
      apartment: [''],
    });
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

  ngOnInit(): void {
    this.loadProfileInfo();
    this.profileForm.controls.email.disable();
  }

  onSubmitPassword(): void {
    this.changePassword();
  }

  logout(): void {
    this.profileService.logOut();
    this.router.navigateByUrl(routeUrls.login);
  }

  onSubmitProfile(): void {
    const editInfo = {
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('secondName')?.value,
      phoneNumber: this.profileForm.get('phoneNumber')?.value,
      dateOfBirth: this.profileForm.get('dateOfBirth')?.value,
      sex: this.profileForm.get('sex')?.value,
      city: this.profileForm.get('city')?.value,
      street: this.profileForm.get('street')?.value,
      house: this.profileForm.get('house')?.value,
      apartment: this.profileForm.get('apartment')?.value,
    } as EditUserProfile;

    this.profileService.editUserInfo(editInfo).subscribe(
      () => {
        this.dialogService.openMessage(' Profile info changed ', ' Close ');
      },
      (error) => {
        console.error(error);
        this.dialogService.openMessage(
          ' Something went wrong. Try again ',
          ' Close '
        );
      }
    );
  }

  private changePassword(): void {
    const newPasswordData = {
      oldPassword: this.passwordForm.get('passwordOld')?.value,
      newPassword: this.passwordForm.get('passwordNew')?.value,
      newPasswordRepeat: this.passwordForm.get('passwordRepeat')?.value,
    } as ChangePassword;
    this.profileService.changePassword(newPasswordData).subscribe(
      () => {
        console.log('password changed successfully');
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
    this.profileService.getUserInfo().subscribe(
      (response) => {
        const data = response.body;
        this.userInfo = data!;
        this.profileForm.get('firstName')?.setValue(data?.firstName);
        this.profileForm.get('secondName')?.setValue(data?.lastName);
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
}
