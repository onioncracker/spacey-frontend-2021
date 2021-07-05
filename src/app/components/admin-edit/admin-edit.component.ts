import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl,
  FormGroup,
  FormGroupDirective, NgForm,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../store/service/employee/employee.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { EmployeeModel } from '../../store/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import {RoleModel} from "../../store/models/role.model";
import {StatusModel} from "../../store/models/user-status.model";
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
interface Roles {
  id: number;
  name: string;
}

interface Statuses {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})

export class AdminEditComponent implements OnInit {
  employee!: EmployeeModel;
  editEmployeeForm: FormGroup;
  errorMatcher: ErrorStateMatcher;

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
    private route: ActivatedRoute,
    private router: Router,
    private errorPageService: ErrorPageService,
    private dialogService: DialogService,
    private tokenStorageService: TokenStorageService,
  ) {
    this.editEmployeeForm = this.formBuilder.group({
      userId: [''],
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      roleId: [''],
      roleName: [''],
      statusId: [''],
      tokenId: [''],
      statusName: [''],
      phoneNumber: ['', [Validators.required]],
    });
    this.errorMatcher = new EmployeeErrorStateMatcher();
    console.log(this.editEmployeeForm);
  }

  async getEmployee(): Promise<void> {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    let employee = await this.employeeService.getEmployee(id).toPromise()
    this.employee = employee;
    this.editEmployeeForm.setValue(this.employee);
    console.log(employee);
  }

  onSubmit(editEmployeeForm: any, employeeForm: FormGroupDirective) {
    this.editEmployee();
    employeeForm.resetForm();
    this.dialogService.openMessage('Employee has been updated', 'close');
  }

  public editEmployee(): void {
    const roleId = this.editEmployeeForm.get('roleId')?.value;
    const roleName = this.roles.find((role) => role.id == roleId)?.name;
    const statusId = this.editEmployeeForm.get('statusId')?.value;
    const statusName = this.statuses.find((el) => el.id == statusId)?.name;

    const editEmployeeData = {
      userId: this.editEmployeeForm.get('userId')?.value,
      email: this.editEmployeeForm.get('email')?.value,
      firstName: this.editEmployeeForm.get('firstName')?.value,
      lastName: this.editEmployeeForm.get('lastName')?.value,
      roleId: roleId,
      roleName: roleName,
      statusId: statusId,
      statusName: statusName,
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

  compareRoles(object1: any, object2: any) {
    return object1 && object2 && object1.roleId== object2.roleId;
  }

  compareStatuses(object1: any, object2: any) {
    return object1 && object2 && object1.statusId == object2.statusId;
  }

  back() {
    this.router.navigate(['/admin-manage']);
  }

  private isAdminRole(): boolean {
    let userRole = this.tokenStorageService.getRole();
    return userRole === 'ADMIN';
  }

  async ngOnInit() {
      await this.getEmployee();
    if (!this.isAdminRole()) {
      this.errorPageService.openErrorPage('Access is denied');
    }
  }
}
