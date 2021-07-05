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
import { AuthService } from '../../store/service/auth/auth.service';
import { Router } from '@angular/router';
import { LoginModel } from '../../store/models/login.model';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { routeUrls } from '../../../environments/router-manager';
import { DefaultErrorStateMatcher } from '../../store/service/DefaultErrorStateMatcher';
import { DialogService } from '../../store/service/dialog/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMatcher = new DefaultErrorStateMatcher();
  loginForm: FormGroup;
  hide = true;
  siteKey = '6LcVzFobAAAAAItOzCPLpCc8Xi83puwXPK3Njaab';
  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type!: 'image' | 'audio';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: AuthService,
    private dialogService: DialogService,
    private storageService: TokenStorageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  onSubmit() {
    this.login();
  }

  login() {
    const loginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    } as LoginModel;

    this.loginForm.controls.email.disable();
    this.loginForm.controls.password.disable();

    this.messageService.login(loginData).subscribe(
      (response) => {
        const data = response.body;
        this.storageService.saveToken(data!.authToken);
        this.storageService.saveRole(data!.role);
        this.router.navigateByUrl(routeUrls.profile);
      },
      (error) => {
        console.warn('LOGIN FAILED: ');
        switch (error.status) {
          case 404:
            this.dialogService.openMessage(
              ' User with such email does not exist. Register to continue ',
              ' Close '
            );
            break;
          case 403:
            this.dialogService.openMessage(
              ' Wrong password. Try again ',
              ' Close '
            );
            break;
          case 401:
            this.dialogService.openMessage(
              ' Either wrong email passed or it is not confirmed. Check your email and try again ',
              ' Close '
            );
            break;
          default:
            console.error('Unexpected server response: ' + error);
            this.dialogService.openMessage(
              ' Something went wrong. Try again ',
              ' Close '
            );
        }
        this.loginForm.controls.email.enable();
        this.loginForm.controls.password.enable();
      }
    );
  }
}
