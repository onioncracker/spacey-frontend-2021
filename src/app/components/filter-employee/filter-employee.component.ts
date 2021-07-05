import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ROLES_PARAM, STATUSES_PARAM } from './filter-employee-params.constants';
import {EmployeeService} from "../../store/service/employee/employee.service";
import {RoleModel} from "../../store/models/role.model";
import {StatusModel} from "../../store/models/user-status.model";

@Component({
  selector: 'app-filter-employee',
  templateUrl: './filter-employee.component.html',
  styleUrls: ['./filter-employee.component.css']
})
export class FilterEmployeeComponent implements OnInit {

  @Output() selectFilterEmployeeItem = new EventEmitter();

  roleFilter: RoleModel[] = [];
  statusFilter: StatusModel[] = [];

  constructor(private employeeService: EmployeeService) { }

  getRolesList(): void {
    this.employeeService
      .getRoles()
      .subscribe((roleFilter: RoleModel[]) => {
        this.roleFilter = roleFilter;
      });
  }

  getStatusesList(): void {
    this.employeeService
      .getStatuses()
      .subscribe((statusFilter: StatusModel[]) => {
      this.statusFilter = statusFilter;
    });
  }

  getFiltersList(): void {
    this.getRolesList();
    this.getStatusesList();
  }

  savedFilters(): void {
    let savedRoles = sessionStorage.getItem(ROLES_PARAM);
    if (savedRoles != null)
      this.roleFilter = JSON.parse(savedRoles);

    let savedStatuses = sessionStorage.getItem(STATUSES_PARAM);
    if (savedStatuses != null) this.statusFilter = JSON.parse(savedStatuses);
  }

  selectedFilters(): void {
    if (
      sessionStorage.getItem(STATUSES_PARAM) === null ||
      sessionStorage.getItem(ROLES_PARAM) === null
    ) {
      this.getFiltersList();
    } else {
      this.savedFilters();
    }
  }
  changeSelection(): void {
    sessionStorage.setItem(
      ROLES_PARAM,
      JSON.stringify(this.roleFilter)
    );
    sessionStorage.setItem(STATUSES_PARAM, JSON.stringify(this.statusFilter));
    this.selectFilterEmployeeItem.emit();
  }

  ngOnInit(): void {
    this.selectedFilters();
  }
}
