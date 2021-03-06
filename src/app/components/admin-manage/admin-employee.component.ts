import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../store/service/employee/employeeService';
import { EmployeeModel } from '../../store/models/EmployeeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css'],
})
export class AdminEmployeeComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'roleName',
    'phoneNumber',
    'email',
    'statusName',
    'actions',
  ];
  dataSource = new MatTableDataSource<EmployeeModel>();
  employees!: EmployeeModel[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  getAllEmployees() {
    this.employeeService
      .getAllEmployees()
      .pipe()
      .subscribe((employees: EmployeeModel[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource(this.employees);
      });
  }
  onChangeEvent(event: any) {
    this.employeeService
      .getAllEmployeesVariable(event.target.value)
      .pipe()
      .subscribe((employees: EmployeeModel[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource(this.employees);
      });
  }

  searchEmployees() {
    this.employeeService
      .getAllEmployees()
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
    this.getAllEmployees();
    this.dataSource.paginator! = this.paginator;
  }
}
