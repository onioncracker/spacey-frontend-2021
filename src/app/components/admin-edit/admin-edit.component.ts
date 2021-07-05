import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl,
  FormGroup,
  FormGroupDirective, NgForm,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../store/service/employee/employee.service';
import { EmployeeModel } from '../../store/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import {RoleModel} from "../../store/models/role.model";
import {StatusModel} from "../../store/models/user-status.model";
import {ErrorStateMatcher} from "@angular/material/core";
import { ErrorPageService } from '../../store/service/error/error-page.service';
import {DialogService} from "../../store/service/dialog/dialog.service";
import {TokenStorageService} from "../../store/service/auth/token-storage.service";

export class EmployeeErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})

export class AdminEditComponent implements OnInit {
  employee!: EmployeeModel;
  roles!: RoleModel[];
  statuses!: StatusModel[];
  editEmployeeForm: FormGroup;
  errorMatcher: ErrorStateMatcher;

  // roles: RoleModel[] = [
  //   { roleId: 4, roleName: 'COURIER', isSelected: true },
  //   { roleId: 3, roleName: 'PRODUCT_MANAGER', isSelected: true },
  // ];
  //
  // statuses: StatusModel[] = [
  //   { statusId: 1, statusName: 'INACTIVED', isSelected: true },
  //   { statusId: 2, statusName: 'ACTIVED', isSelected: true },
  //   { statusId: 3, statusName: 'TERMINATED', isSelected: true },
  // ];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private errorPageService: ErrorPageService,
    private dialogService: DialogService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.editEmployeeForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      tokenId: ['', [Validators.required]],
      statusName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
    this.errorMatcher = new EmployeeErrorStateMatcher();
  }

  getEmployee(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.employeeService.getEmployee(id).subscribe((employee) => {
      this.employee = employee;
      this.editEmployeeForm.setValue(this.employee);
      console.log(employee);
    });
  }

  onSubmit(editEmployeeForm: any, employeeForm: FormGroupDirective) {
    this.editEmployee();
    employeeForm.resetForm();
    this.dialogService.openMessage('Employee has been updated', 'close');
  }

  public editEmployee(): void {

    const editEmployeeData = {
      userId: this.editEmployeeForm.get('userId')?.value,
      email: this.editEmployeeForm.get('email')?.value,
      firstName: this.editEmployeeForm.get('firstName')?.value,
      lastName: this.editEmployeeForm.get('lastName')?.value,
      roleId: this.editEmployeeForm.get('roleId')?.value,
      roleName: this.editEmployeeForm.get('roleName')?.value,
      statusId: this.editEmployeeForm.get('statusId')?.value,
      statusName: this.editEmployeeForm.get('statusName')?.value,
      tokenId: this.editEmployeeForm.get('tokenId')?.value,
      phoneNumber: this.editEmployeeForm.get('phoneNumber')?.value,
    } as EmployeeModel;

    this.editEmployeeForm.controls.email.disable();
    this.editEmployeeForm.controls.firstName.disable();
    this.editEmployeeForm.controls.lastName.disable();
    this.editEmployeeForm.controls.roleId.disable();
    this.editEmployeeForm.controls.statusId.disable();
    this.editEmployeeForm.controls.phoneNumber.disable();

    this.employeeService
      .editEmployee(this.employee.userId, editEmployeeData)
      .subscribe(
        (response) => {
          const data = response.body;
          console.log(data);
        },
        (error) => {
          console.warn(error);

          this.editEmployeeForm.controls.email.enable();
          this.editEmployeeForm.controls.firstName.enable();
          this.editEmployeeForm.controls.lastName.enable();
          this.editEmployeeForm.controls.roleId.enable();
          this.editEmployeeForm.controls.statusId.enable();
          this.editEmployeeForm.controls.phoneNumber.enable();
        }
      );
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  back() {
    this.router.navigate(['/admin-manage']);
  }

  allRoles() {
    this.employeeService
      .getRoles()
      .pipe()
      .subscribe((roles: RoleModel[]) => {
        this.roles = roles;
      });
  }

  allStatuses() {
    this.employeeService
      .getStatuses()
      .pipe()
      .subscribe((statuses: StatusModel[]) => {
        this.statuses = statuses;
      });
  }

  private isAdminRole(): boolean {
    let userRole = this.tokenStorageService.getRole();
    return userRole === 'ADMIN';
  }

  ngOnInit() {
    this.allRoles();
    this.allStatuses();
    this.getEmployee();
    if (!this.isAdminRole()) {
      this.errorPageService.openErrorPage('Access is denied');
    }
  }
}
