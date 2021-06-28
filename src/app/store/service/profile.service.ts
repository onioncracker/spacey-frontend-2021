import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { endpointUrls } from '../../../environments/endpoint-routes-manager';
import { EmployeeProfileModel } from '../models/employee-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private employeeInfoURL =
    environment.url + endpointUrls.apiPrefix + '/employee-info';
  private httpOptions = { observe: 'response' as const };

  constructor(private http: HttpClient) {}

  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      alert('Сталася помилка. Перезавантажте сайт');
    } else {
      console.error(
        `Сталася помилка сервера з кодом ${error.status}, ` +
          ` текст: ${error.error}`
      );
    }
    return throwError('some shit');
  }

  getEmployeeInfo(): Observable<HttpResponse<EmployeeProfileModel>> {
    return this.http.get<EmployeeProfileModel>(
      this.employeeInfoURL,
      this.httpOptions
    );
  }
}