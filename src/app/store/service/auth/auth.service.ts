import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { RegisterModel } from '../../models/register.model';
import { AuthResponseModel } from '../../models/auth-response.model';
import { LoginModel } from '../../models/login.model';
import { environment } from '../../../../environments/environment';
import { endpointUrls } from '../../../../environments/endpoint-routes-manager';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerURL = environment.url + endpointUrls.apiPrefix + '/register';
  private loginURL = environment.url + endpointUrls.apiPrefix + '/login';
  private confirmURL =
    environment.url + endpointUrls.apiPrefix + '/registration_confirm';
  private resendConfirmURL =
    environment.url + endpointUrls.apiPrefix + '/resend_registration_token';

  private httpOptions = { observe: 'response' as const };

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  // @ts-ignore
  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      alert('Сталася помилка. Перезавантажте сайт');
      this.logOut();
    } else {
      console.error(
        `Сталася помилка сервера з кодом ${error.status}, ` +
          ` текст: ${error.error}`
      );
    }
    return throwError('some shit');
  }

  logOut(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
  }

  isAuthorised(): boolean {
    return this.tokenStorageService.isAuthorised();
  }

  register(
    registerData: RegisterModel
  ): Observable<HttpResponse<AuthResponseModel>> {
    return this.http.post<AuthResponseModel>(
      this.registerURL,
      registerData,
      this.httpOptions
    );
  }

  login(loginData: LoginModel): Observable<HttpResponse<AuthResponseModel>> {
    return this.http.post<AuthResponseModel>(
      this.loginURL,
      loginData,
      this.httpOptions
    );
  }

  confirmRegistration(token: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.confirmURL + '?token=' + token);
  }

  resendRegistration(token: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resendConfirmURL + '?token=' + token);
  }
}
