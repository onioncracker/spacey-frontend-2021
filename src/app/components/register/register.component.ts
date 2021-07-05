import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../../store/models/user';
import { AuthService } from '../../store/service/auth/auth.service';
import { RegisterModel } from '../../store/models/register.model';
import { routeUrls } from '../../../environments/router-manager';
import { DefaultErrorStateMatcher } from '../../store/service/DefaultErrorStateMatcher';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { validatorPatterns } from '../../../environments/validate-patterns';

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
    private dialogService: DialogService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(validatorPatterns.passwordPattern),
        ],
      ],
      name: ['', [Validators.required, Validators.maxLength(40)]],
      surname: ['', [Validators.required, Validators.maxLength(40)]],
    });
    this.errorMatcher = new DefaultErrorStateMatcher();
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
      () => {
        this.dialogService.openMessage(
          ' Check your email to verify your account ',
          ' Close '
        );
        this.router.navigateByUrl(routeUrls.login);
      },
      (error) => {
        console.warn('REGISTRATION FAILED');
        if (error.status === 400) {
          this.dialogService.openMessage(
            ' This email is already registered',
            ' Close '
          );
          this.router.navigateByUrl(routeUrls.login);
        } else {
          this.dialogService.openMessage(
            ' Something went wrong. Try again ',
            ' Close '
          );
          console.error(error);
        }

        this.registerForm.controls.name.enable();
        this.registerForm.controls.email.enable();
        this.registerForm.controls.surname.enable();
        this.registerForm.controls.password.enable();
      }
    );
  }
}
