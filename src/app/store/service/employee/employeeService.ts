import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EmployeeModel } from '../../models/EmployeeModel';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/RegisterModel';
import { AuthResponseModel } from '../../models/AuthResponseModel';
import { LoginModel } from '../../models/LoginModel';
import { AddEmployeeModel } from '../../models/AddEmployeeModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private hostURL = 'https://spacey-backend.herokuapp.com';
  private employeeUrl = `${this.hostURL}/employees`;
  private addEmployeeUrl = this.hostURL + '/employees';
  // private loginURL = this.hostURL + '/login';
  private httpOptions = { observe: 'response' as const };

  constructor(private http: HttpClient, private router: Router) {}

  getAllEmployees(): Observable<any> {
    return this.http.get(this.employeeUrl);
  }

  addEmployee(addEmployeeData: AddEmployeeModel): Observable<any> {
    const url = `${this.addEmployeeUrl}`;
    const body = {
      email: addEmployeeData.email,
      status: addEmployeeData.status,
      firstName: addEmployeeData.firstName,
      lastName: addEmployeeData.lastName,
      userRole: addEmployeeData.userRole,
      phoneNumber: addEmployeeData.phoneNumber,
    };
    return this.http.post(url, body);
  }
}
