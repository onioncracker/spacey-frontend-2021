import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddEmployeeModel } from '../../models/AddEmployeeModel';
import { EmployeeModel } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private hostURL = 'https://spacey-backend.herokuapp.com';
  private employeeUrl = `${this.hostURL}/api/v1/employees`;
  private searchEmployeeUrl = `${this.employeeUrl}/search`;
  constructor(private http: HttpClient) {}

  getAllEmployees(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get(this.employeeUrl, { params });
  }

  getAllEmployeesVariable(
    page: number,
    pageSize: number,
    prompt: string
  ): Observable<any> {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);
    const url = `${this.searchEmployeeUrl}/${prompt}`;
    return this.http.get(url, { params });
  }

  addEmployee(addEmployeeData: AddEmployeeModel): Observable<any> {
    const url = `${this.employeeUrl}`;
    return this.http.post(url, addEmployeeData);
  }

  getEmployee(id: number): Observable<EmployeeModel> {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.get<EmployeeModel>(url);
  }

  editEmployee(id: number, editEmployeeData: EmployeeModel): Observable<any> {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.put(url, editEmployeeData);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
