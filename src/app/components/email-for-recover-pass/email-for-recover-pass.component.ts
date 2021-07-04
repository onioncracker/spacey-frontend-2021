import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultErrorStateMatcher } from '../../store/service/DefaultErrorStateMatcher';
import { AuthService } from '../../store/service/auth/auth.service';
import { Router } from '@angular/router';
import { routeUrls } from '../../../environments/router-manager';

@Component({
  selector: 'app-email-for-recover-pass',
  templateUrl: './email-for-recover-pass.component.html',
  styleUrls: ['./email-for-recover-pass.component.css'],
})
export class EmailForRecoverPassComponent {
  emailForm: FormGroup;
  errorMatcher = new DefaultErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService
      .sendEmailForRecover(this.emailForm.get('email')?.value)
      .subscribe(() => {
        alert('check your email');
        this.router.navigateByUrl(routeUrls.login);
      });
  }
}
