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

export class EmployeeProfileErrorStateMatcher implements ErrorStateMatcher {
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
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileInfo?: EmployeeProfileModel;
  dataLoaded = false;
  errorMatcher = new EmployeeProfileErrorStateMatcher();
  hideOld = false;
  hideNew = true;
  hideRepeat = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router
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
      email: this.profileInfo?.email,
      password: this.profileForm.get('passwordNew')?.value,
      passwordRepeat: this.profileForm.get('passwordRepeat')?.value,
    } as ChangePassword;
    this.profileService.changePassword(newPassData).subscribe(
      (response) => {
        alert('password changed successfully');
      },
      (error) => {
        alert('something go wrong');
      }
    );
  }

  private loadProfileInfo(): void {
    this.profileService.getEmployeeInfo().subscribe(
      (response) => {
        const data = response.body;
        this.profileInfo = data!;
        this.dataLoaded = true;
        console.log('data loaded');
      },
      (error) => {
        console.warn('Loading propositions failed');
        this.profileService.handleError(error);
      }
    );
  }

  logout(): void {
    this.profileService.logOut();
    this.router.navigateByUrl(routeUrls.login);
  }
}
