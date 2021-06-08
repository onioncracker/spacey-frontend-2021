import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../../store/service/employee/employeeService';
import { EmployeeModel } from '../../store/models/EmployeeModel';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css'],
})
export class AdminEmployeeComponent implements OnInit {
  displayedColumns: string[] = [
    'loginId',
    'email',
    'firstName',
    'lastName',
    'phoneNumber',
    'status',
    'userRole',
    'actions',
  ];
  dataSource = new MatTableDataSource<EmployeeModel>();
  employees!: EmployeeModel[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService) {}

  getAllEmployees() {
    this.employeeService
      .getAllEmployees()
      .pipe()
      .subscribe((employees: EmployeeModel[]) => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource(this.employees);
      });
  }

  ngOnInit() {
    this.getAllEmployees();
    this.dataSource.paginator! = this.paginator;
  }
}
