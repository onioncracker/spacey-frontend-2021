import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AddEmployeeModel } from '../../models/AddEmployeeModel';
import { EmployeeModel } from '../../models/EmployeeModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private hostURL = 'https://spacey-backend.herokuapp.com';
  private employeeUrl = `${this.hostURL}/api/employees`;
  private searchEmployeeUrl = this.employeeUrl + '/search';
  private addEmployeeUrl = `${this.employeeUrl}/create`;
  private editEmployeeUrl = this.employeeUrl + '/update';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<any> {
    return this.http.get(this.employeeUrl);
  }

  addEmployee(addEmployeeData: AddEmployeeModel): Observable<any> {
    const url = `${this.employeeUrl}`;
    const body = {
      email: addEmployeeData.email,
      statusId: addEmployeeData.statusId,
      statusName: addEmployeeData.statusName,
      firstName: addEmployeeData.firstName,
      lastName: addEmployeeData.lastName,
      roleId: addEmployeeData.roleId,
      roleName: addEmployeeData.roleName,
      phoneNumber: addEmployeeData.phoneNumber,
    };
    return this.http.post(url, body);
  }

  // Error handling
  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  editEmployee(editEmployeeData: EmployeeModel): Observable<any> {
    const url = `${this.editEmployeeUrl}`;
    const body = {
      email: editEmployeeData.email,
      statusId: editEmployeeData.statusId,
      firstName: editEmployeeData.firstName,
      lastName: editEmployeeData.lastName,
      roleId: editEmployeeData.roleId,
      phoneNumber: editEmployeeData.phoneNumber,
    };
    return this.http.post(url, body);
  }
}
