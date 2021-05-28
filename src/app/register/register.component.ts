import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../model/user';
import {FormBuilder, FormControl, NgForm, FormGroupDirective, FormGroup, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {RegisterModel} from "../model/RegisterModel";
import {MessageService} from "../service/MessageService";
import {TokenStorageService} from "../service/TokenStorageService";

export class RegistrationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User | undefined;
  errorMatcher: ErrorStateMatcher;
  registerForm: FormGroup;
  hide: boolean = true;



  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private storageService: TokenStorageService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,30}')]],
      // password: ['', [Validators.required]],
      name: ['',[ Validators.required, Validators.maxLength(40)]],
      surname: ['', [Validators.required, Validators.maxLength(40)]],
    });
    this.errorMatcher = new RegistrationErrorStateMatcher();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.register();
  }

  public register(): void {
    const registrationData = {
      name: this.registerForm.get('name')?.value,
      surname: this.registerForm.get('surname')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      // phone_number: this.registerForm.get('phone_number').value,
    } as RegisterModel;

    this.registerForm.controls.name.disable();
    this.registerForm.controls.email.disable();
    this.registerForm.controls.password.disable();
    this.registerForm.controls.surname.disable();

    this.messageService.register(registrationData).subscribe(response => {
      const data = response.body;
      // sessionStorage.setItem('token', data!.authToken);
      this.storageService.saveToken(data!.authToken);
      console.log('user registered successfully');
      // this.router.navigate(['main-page']);
    }, error => {
      console.warn('REGISTRATION FAILED');
      if (error.status === 409){
        alert('Вказаний email вже зареєстровано в базі');
        this.router.navigate(['/login']);
      } else {
        alert('Виникла помилка. Спробуйте ще раз');
        console.warn(error);
      }

      this.registerForm.controls.name.enable();
      this.registerForm.controls.email.enable();
      this.registerForm.controls.phoneNumber.enable();
      this.registerForm.controls.email.enable();
      this.registerForm.controls.password.enable();
    });
  }
}
