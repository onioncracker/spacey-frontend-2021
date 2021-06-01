import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css']
})
export class AdminEmployeeComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'firstname', 'lastname', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator! = this.paginator;
  }
}

export interface PeriodicElement {
  firstname: string;
  lastname: string;
  position: number;
  role: string;
  status: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 228, firstname: 'Oleg', lastname: 'Ivanov', role: 'PM', status: 'H', actions: 'edit'},
  {position: 229, firstname: 'Ihor', lastname: 'Ivanov', role: 'Courier', status: 'He', actions: 'edit'},
  {position: 230, firstname: 'Katya', lastname: 'Ivanov', role: 'PM', status: 'Li', actions: 'edit'},
  {position: 231, firstname: 'Dima', lastname: 'Ivanov', role: 'PM', status: 'Be', actions: 'edit'},
  {position: 232, firstname: 'Masha', lastname: 'Ivanov', role: 'PM', status: 'B', actions: 'edit'},
  {position: 233, firstname: 'Andriy', lastname: 'Ivanov', role: 'PM', status: 'C', actions: 'edit'},
  {position: 234, firstname: 'Misha', lastname: 'Ivanov', role: 'PM', status: 'N', actions: 'edit'},
  {position: 235, firstname: 'Ivan', lastname: 'Ivanov', role: 'PM', status: 'O', actions: 'edit'},
  {position: 236, firstname: 'Ira', lastname: 'Ivanov', role: 'PM', status: 'F', actions: 'edit'},
  {position: 237, firstname: 'Khrystyna', lastname: 'Ivanov', role: 'PM', status: 'Ne', actions: 'edit'},
  {position: 238, firstname: 'Polia', lastname: 'Ivanov', role: 'PM', status: 'Na', actions: 'edit'},
  {position: 239, firstname: 'Vlada', lastname: 'Ivanov', role: 'PM', status: 'Mg', actions: 'edit'},
  {position: 240, firstname: 'Sergiy', lastname: 'Ivanov', role: 'PM', status: 'Al', actions: 'edit'},
  {position: 241, firstname: 'Vania', lastname: 'Ivanov', role: 'PM', status: 'Si', actions: 'edit'},
  {position: 242, firstname: 'Vlad', lastname: 'Ivanov', role: 'PM', status: 'P', actions: 'edit'},
  {position: 243, firstname: 'Sasha', lastname: 'Ivanov', role: 'PM', status: 'S', actions: 'edit'},
  {position: 244, firstname: 'Artem', lastname: 'Ivanov', role: 'PM', status: 'Cl', actions: 'edit'},
  {position: 245, firstname: 'Vova', lastname: 'Ivanov', role: 'PM', status: 'Ar', actions: 'edit'},
  {position: 246, firstname: 'Viktor', lastname: 'Ivanov', role: 'PM', status: 'K', actions: 'edit'},
  {position: 247, firstname: 'Tania', lastname: 'Ivanov', role: 'PM', status: 'Ca', actions: 'edit'},
];
