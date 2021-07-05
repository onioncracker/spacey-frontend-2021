import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../store/service/employee/employee.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { AddEmployeeModel } from '../../store/models/AddEmployeeModel';
import { Router } from '@angular/router';
import {RoleModel} from "../../store/models/role.model";
import {StatusModel} from "../../store/models/user-status.model";
import {ErrorPageService} from "../../store/service/error/error-page.service";
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

interface Roles {
  id: number;
  name: string;
}

interface Statuses {
  id: number;
  name: string;
}
@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
})
export class AdminAddComponent implements OnInit{
  addEmployeeForm: FormGroup;
  errorMatcher: ErrorStateMatcher;
  disableSelect = new FormControl(false);

  roles: Roles[] = [
    { id: 4, name: 'Courier' },
    { id: 3, name: 'Product Manager' },
  ];

  statuses: Statuses[] = [
    { id: 1, name: 'Inactive' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Terminate' },
  ];


  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private errorPageService: ErrorPageService,
    private dialogService: DialogService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.addEmployeeForm = this.formBuilder.group({
      userId: [''],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      roleId: [''],
      statusId: [''],
      tokenId: [''],
      phoneNumber: ['', [Validators.required, Validators.maxLength(13)]],
    });
    this.errorMatcher = new EmployeeErrorStateMatcher();

  }

  onSubmit(addEmployeeForm: any, employeeForm: FormGroupDirective) {
    this.addEmployee();
    employeeForm.resetForm();
    this.dialogService.openMessage('Employee has been added', 'close');
  }

  public addEmployee(): void {
    const roleId = this.addEmployeeForm.get('roleId')?.value;
    const roleName = this.roles.find((role) => role.id == roleId)?.name;
    const statusId = this.addEmployeeForm.get('statusId')?.value;
    const statusName = this.statuses.find((el) => el.id == statusId)?.name;

    const addEmployeeData = {
      userId: this.addEmployeeForm.get('userId')?.value,
      email: this.addEmployeeForm.get('email')?.value,
      firstName: this.addEmployeeForm.get('firstName')?.value,
      lastName: this.addEmployeeForm.get('lastName')?.value,
      roleId: roleId,
      roleName: roleName,
      statusId: statusId,
      statusName: statusName,
      tokenId: this.addEmployeeForm.get('tokenId')?.value,
      phoneNumber: this.addEmployeeForm.get('phoneNumber')?.value,
    } as AddEmployeeModel;

    console.log(addEmployeeData);

    this.addEmployeeForm.controls.email.disable();
    this.addEmployeeForm.controls.firstName.disable();
    this.addEmployeeForm.controls.lastName.disable();
    this.addEmployeeForm.controls.roleId.disable();
    this.addEmployeeForm.controls.statusId.disable();
    this.addEmployeeForm.controls.phoneNumber.disable();

    this.employeeService.addEmployee(addEmployeeData).subscribe(
      (response) => {
        const data = response.body;
        console.log(data);
      },
      (error) => {
        console.warn(error);
        this.addEmployeeForm.controls.email.enable();
        this.addEmployeeForm.controls.firstName.enable();
        this.addEmployeeForm.controls.lastName.enable();
        this.addEmployeeForm.controls.roleId.enable();
        this.addEmployeeForm.controls.statusId.enable();
        this.addEmployeeForm.controls.phoneNumber.enable();
      }
    );
  }

  back() {
    this.router.navigate(['/admin-manage']);
  }

  private isAdminRole(): boolean {
    let userRole = this.tokenStorageService.getRole();
    return userRole === 'ADMIN';
  }

  ngOnInit() {
    if (!this.isAdminRole()) {
      this.errorPageService.openErrorPage('Access is denied');
    }
  }
}
