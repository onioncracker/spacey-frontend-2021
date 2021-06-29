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
import {EditUserProfile} from "../../store/models/edit-user-profile.model";
import {TokenStorageService} from "../../store/service/auth/token-storage.service";
import {Router} from "@angular/router";
import {routeUrls} from "../../../environments/router-manager";

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
    private profileService: ProfileService,
    private tokenStorageService: TokenStorageService,
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

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl(routeUrls.productsCatalog);
  }

  onSubmitProfile(): void {
    console.log('submiting new info');
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

    this.profileService.editUserInfo(editInfo).subscribe((response) => {
      alert("info changed");
    }, (error) => {
      console.error(error);
      alert("something went wrong. try again later");
    })
  }

  private changePassword(): void {}

  private loadProfileInfo(): void {
    this.profileService.getUserInfo().subscribe(
      (response) => {
        const data = response.body;
        this.userInfo = data!;
        console.log('user info loaded');
      },
      (error) => {
        console.warn('Loading propositions failed');
        this.profileService.handleError(error);
      }
    );
  }
}
