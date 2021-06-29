import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../store/service/employee/employee.service';
import { EmployeeModel } from '../../store/models/employee.model';
import { Router } from '@angular/router';

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
        // this.dataSource.paginator = this.paginator;
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

  btnClick() {
    this.router.navigate(['/admin-add']);
  }

  ngOnInit() {
    this.pageSize = 5;
    this.pageSizeOptions = [5, 10, 20];
    this.getAllEmployees();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
