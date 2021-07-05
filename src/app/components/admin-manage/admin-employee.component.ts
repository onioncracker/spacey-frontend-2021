import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../store/service/employee/employee.service';
import { EmployeeModel } from '../../store/models/employee.model';
import { Router } from '@angular/router';
import {
  ROLES_PARAM,
  STATUSES_PARAM,
} from '../filter-employee/filter-employee-params.constants';
import { PAGE_PARAM } from '../filter/filter-params.constants';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css'],
})
export class AdminEmployeeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'roleName',
    'phoneNumber',
    'email',
    'statusName',
    'userId',
  ];
  dataSource = new MatTableDataSource<EmployeeModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  employees!: EmployeeModel[];
  search!: string;
  length!: number;
  pageSize!: number;
  showFilter!: boolean;
  pageSizeOptions!: number[];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  getAllEmployees() {
    this.employeeService
      .getAllEmployees(0, this.pageSize)
      .pipe()
      .subscribe((employees: EmployeeModel[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource(this.employees);
      });
  }

  getAllEmployeesQuery(queryString: string) {
    this.employeeService
      .getEmployeesByQuery(queryString, 0, this.pageSize)
      .pipe()
      .subscribe((employees: EmployeeModel[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource(this.employees);
      });
  }

  onChangeEvent() {
    console.log();
    if (this.search.length > 1) {
      this.employeeService
        .getAllEmployeesVariable(0, this.pageSize, this.search)
        .pipe()
        .subscribe((employees: EmployeeModel[]) => {
          this.employees = employees;
          this.dataSource = new MatTableDataSource(this.employees);
        });
    } else {
      this.getAllEmployees();
    }
  }

  onPaginateChange(event) {
    this.pageSize = event.pageSize;
    this.employeeService
      .getAllEmployeesVariable(event.page, event.pageSize, this.search)
      .pipe()
      .subscribe((employees: EmployeeModel[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource(this.employees);
      });
  }

  public onToggleFilters(): void {
    this.showFilter = !this.showFilter;
  }

  btnClick() {
    this.router.navigate(['/admin-add']);
  }

  getFiltersQueryString(...args): string {
    let qs = '';

    args.forEach((i) => {
      if (i) {
        qs += qs ? `&${i}` : `?${i}`;
      }
    });
    return qs;
  }

  getQueryStringByFilter(name, data): string {
    if (data && data.length) {
      const selectedFilters = data
        .filter((i) => i.isSelected)
        .map((i) => i.id)
        .join(',');
      return selectedFilters ? `${name}=${selectedFilters}` : '';
    }
    return '';
  }

  handleEmployees(): void {
    const rolesSessionStorage = (sessionStorage.getItem(ROLES_PARAM) ||
      null) as string;
    const statusesSessionStorage = (sessionStorage.getItem(STATUSES_PARAM) ||
      null) as string;

    const roleId = this.getQueryStringByFilter(
      ROLES_PARAM,
      JSON.parse(rolesSessionStorage)
    );

    const statusId = this.getQueryStringByFilter(
      STATUSES_PARAM,
      JSON.parse(statusesSessionStorage)
    );

    const queryString = this.getFiltersQueryString(roleId, statusId);
    this.getAllEmployeesQuery(queryString);
    console.log(queryString);
  }

  onSelectedFilter(): void {
    this.handleEmployees();
  }

  ngOnInit() {
    this.showFilter = false;
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 20];
    // this.getAllEmployees();
    this.handleEmployees();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
