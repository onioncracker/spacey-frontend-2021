import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../store/service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { RecoverPassword } from '../../store/models/recover-password.model';
import { routeUrls } from '../../../environments/router-manager';
import { Subscription } from 'rxjs';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
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
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent implements OnInit, OnDestroy {
  errorMatcher = new CustomErrorStateMatcher();
  private routeSub!: Subscription;
  private token: string = '';
  passwordForm: FormGroup;
  hide = true;
  hideRepeat = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(
      (params) => {
        console.log(params['token']);
        this.token = params['token'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    const recoverData = {
      password: this.passwordForm.get('password')?.value,
      passwordRepeat: this.passwordForm.get('passwordRepeat')?.value,
    } as RecoverPassword;
    this.authService.recoverPassword(this.token, recoverData).subscribe(
      () => {
        console.log('password recovered successfully');
        this.router.navigateByUrl(routeUrls.profile);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
