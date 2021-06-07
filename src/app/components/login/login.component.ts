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
import { AuthService } from '../../store/service/auth/AuthService';
import { Router } from '@angular/router';
import { LoginModel } from '../../store/models/LoginModel';
import { TokenStorageService } from '../../store/service/auth/TokenStorageService';

export class LoginErrorStateMatcher implements ErrorStateMatcher {
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMatcher = new LoginErrorStateMatcher();
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: AuthService,
    private router: Router,
    private storageService: TokenStorageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
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
        this.messageService.loggedIn = true;
        this.router.navigate(['/']);
        console.warn('logged in successfully');
        console.log(this.storageService.getToken());
      },
      (error) => {
        console.warn('LOGIN FAILED: ');
        switch (error.status) {
          case 404:
            alert(
              'Вказаний email не зареєстровано в базі. Перевірте введені дані та спробуйте ще раз'
            );
            break;
          case 403:
            alert('Невірно вказаний пароль. спробуйте ще раз');
            break;
          default:
            console.error('Unexpected server response: ' + error);
            alert('Сталася помилка сервера. Спробуйте пізніше');
          // this.router.navigate(['/main-page']);
        }

        this.loginForm.controls.email.enable();
        this.loginForm.controls.password.enable();
      }
    );
  }
}
