import { Component, OnInit } from '@angular/core';
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
import { RegistrationErrorStateMatcher } from '../register/register.component';
import { EmployeeModel } from '../../store/models/employee.model';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Roles {
  id: number;
  name: string;
}

interface Statuses {
  id: number;
  name: string;
}

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
    private location: Location,
    private router: Router
  ) {
    this.editEmployeeForm = this.formBuilder.group({
      userId: [''],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      roleId: [''],
      roleName: ['', [Validators.required]],
      tokenId: [''],
      statusId: [''],
      statusName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(13)]],
    });
    this.errorMatcher = new RegistrationErrorStateMatcher();
  }

  getEmployee(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.employeeService.getEmployee(id).subscribe((employee) => {
      this.employee = employee;
      this.editEmployeeForm.setValue(this.employee);
      console.log(employee);
    });
  }

  onSubmit(editEmployeeForm: any, employeeForm: FormGroupDirective) {
    this.editEmployee();
    employeeForm.resetForm();
    window.alert('Employee has been edited!');
  }

  public editEmployee(): void {
    const roleId = this.editEmployeeForm.get('roleId')?.value;
    const roleName = this.roles.find((el) => el.id == roleId)?.name;
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
      phoneNumber: this.editEmployeeForm.get('phoneNumber')?.value,
    } as EmployeeModel;

    console.log(editEmployeeData);

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
  ngOnInit() {
    this.getEmployee();
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  back() {
    this.router.navigate(['/admin-manage']);
  }
}
