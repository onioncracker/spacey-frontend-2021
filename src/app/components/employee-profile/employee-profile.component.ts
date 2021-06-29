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
  selector: 'app-profile-info',
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
    private profileService: ProfileService
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['Cristopher'],
      email: ['cris@email.com'],
      secondName: ['Robin'],
      phoneNumber: ['0997775533'],
      role: ['Courier'],
      status: ['Inactive'],
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
    // this.loadProfileInfo();
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

  private changePassword(): void {}

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
}
