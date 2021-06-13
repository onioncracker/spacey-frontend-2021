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
  private employeeUrl = `${this.hostURL}/employees`;
  private searchEmployeeUrl = this.employeeUrl + '/search';

  // private editEmployeeUrl = this.employeeUrl + '/update';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<any> {
    return this.http.get(this.employeeUrl);
  }

  // search(term: string): Observable<EmployeeModel> {
  //   return this.http.get(`{this.searchEmployeeUrl}/?lastName=${term}`)
  //     .map(response => response.json().data as EmployeeModel[])
  //     .catch(this.handleError);
  // }
  // searchEmployees(term: Observable<EmployeeModel>): Observable {
  //   return term.debouncedTime(200).distinctUntilChanged().switchMap(term => this.search(term));
  // }

  // this.http.request('GET', this.searchEmployeeUrl + '?' + 'lastName=term', {responseType:'json'});
  // search(term:string): Observable {
  //   return this.http.get(`api/employee/?firstName=${term}`)
  //     .map(response =>  response.json().data as Employee[])
  //     .catch(this.handleError);
  // }
  //
  // searchEmployees(term: Observable): Observable {
  //   return term.debounceTime(200)
  //     .distinctUntilChanged()
  //     .switchMap(term => this.search(term));//here is the error
  // }
  //
  // private handleError(error: any): Promise {
  //   console.error('Error on EmployeeSearchService', error);
  //   return Promise.reject(error.message || error);
  // }

  addEmployee(addEmployeeData: AddEmployeeModel): Observable<any> {
    const url = `${this.employeeUrl}`;
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
// editEmployee(editEmployeeData: EmployeeModel): Observable<any> {
//   const url = `${this.employeeUrl}`;
//   const body = {
//     email: editEmployeeData.email,
//     status: editEmployeeData.status,
//     firstName: editEmployeeData.firstName,
//     lastName: editEmployeeData.lastName,
//     userRole: editEmployeeData.userRole,
//     phoneNumber: editEmployeeData.phoneNumber,
//   };
//   return this.http.post(url, body);
// }
