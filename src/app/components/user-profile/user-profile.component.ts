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
import { EmployeeProfileErrorStateMatcher } from '../employee-profile/employee-profile.component';

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
  errorMatcher = new EmployeeProfileErrorStateMatcher();

  hideOld = true;
  hideNew = true;
  hideRepeat = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
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
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,30}'),
        ],
      ],
      passwordNew: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,30}'),
        ],
      ],
      passwordRepeat: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,30}'),
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

  onSubmitProfile(): void {}

  private changePassword(): void {}

  private loadProfileInfo(): void {
    this.profileService.getUserInfo().subscribe(
      (response) => {
        const data = response.body;
        this.userInfo = data!;
        // this.dataLoaded = true;
        console.log('user info loaded');
      },
      (error) => {
        console.warn('Loading propositions failed');
        this.profileService.handleError(error);
      }
    );
  }
}
