import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddEmployeeModel } from '../../models/AddEmployeeModel';
import { EmployeeModel } from '../../models/employee.model';
import { environment } from '../../../../environments/environment';
import { RoleModel } from '../../models/role.model';
import { StatusModel } from '../../models/user-status.model';
import { ProductModel } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private hostURL = 'https://spacey-backend.herokuapp.com';
  private employeeUrl = `${this.hostURL}/api/v1/employees`;
  private searchEmployeeUrl = `${this.employeeUrl}/search`;
  private statusUrl = `${environment.url}/api/v1/user-statuses`;
  private roleUrl = `${environment.url}/api/v1/roles/employees`;
  constructor(private http: HttpClient) {}

  getAllEmployees(page: number, pageSize: number): Observable<EmployeeModel[]> {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get<EmployeeModel[]>(this.employeeUrl, { params });
  }

  getEmployeesByQuery(
    queryString: string,
    page: number,
    pageSize: number
  ): Observable<EmployeeModel[]> {
    const params = new HttpParams()
      .append('page', page)
      .append('pageSize', pageSize);
    return this.http.get<EmployeeModel[]>(`${this.employeeUrl}${queryString}`, {
      params,
    });
  }

  getRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.roleUrl);
  }

  getStatuses(): Observable<StatusModel[]> {
    return this.http.get<StatusModel[]>(this.statusUrl);
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
}
