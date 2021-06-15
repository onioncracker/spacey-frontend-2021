import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  NgForm,
  FormGroupDirective,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../../store/models/user';
import { AuthService } from '../../store/service/auth/AuthService';
import { TokenStorageService } from '../../store/service/auth/TokenStorageService';
import { RegisterModel } from '../../store/models/RegisterModel';

export class RegistrationErrorStateMatcher implements ErrorStateMatcher {
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User | undefined;
  errorMatcher: ErrorStateMatcher;
  registerForm: FormGroup;
  hide: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: AuthService,
    private storageService: TokenStorageService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,30}'),
        ],
      ],
      // password: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(40)]],
      surname: ['', [Validators.required, Validators.maxLength(40)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
    });
    this.errorMatcher = new RegistrationErrorStateMatcher();
  }

  onSubmit() {
    this.register();
  }

  public register(): void {
    const registrationData = {
      firstName: this.registerForm.get('name')?.value,
      lastName: this.registerForm.get('surname')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    } as RegisterModel;

    this.registerForm.controls.name.disable();
    this.registerForm.controls.email.disable();
    this.registerForm.controls.password.disable();
    this.registerForm.controls.surname.disable();

    this.messageService.register(registrationData).subscribe(
      (response) => {
        // const data = response.body;
        // sessionStorage.setItem('token', data!.authToken);
        // this.storageService.saveToken(data!.authToken);
        console.log('user registered successfully');
        // this.router.navigate(['main-page']);
      },
      (error) => {
        console.warn('REGISTRATION FAILED');
        if (error.status === 409) {
          alert('Вказаний email вже зареєстровано в базі');
          this.router.navigate(['/login']);
        } else {
          alert('Виникла помилка. Спробуйте ще раз');
          console.warn(error);
        }

        this.registerForm.controls.name.enable();
        this.registerForm.controls.email.enable();
        this.registerForm.controls.surname.enable();
        this.registerForm.controls.password.enable();
      }
    );
  }
}
