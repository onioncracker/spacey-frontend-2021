import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { RegisterModel } from '../../models/RegisterModel';
import { AuthResponseModel } from '../../models/AuthResponseModel';
import { LoginModel } from '../../models/LoginModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private hostURL = 'http://localhost/5000';
  private registerURL = this.hostURL + '/register';
  private loginURL = this.hostURL + '/login';

  public loggedIn = false;
  private httpOptions = { observe: 'response' as const };

  constructor(private http: HttpClient, private router: Router) {}

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
    sessionStorage.setItem('token', '');
    this.loggedIn = false;
    this.router.navigate(['/']);
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
}