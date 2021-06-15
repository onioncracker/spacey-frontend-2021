import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../store/service/employee/employeeService';
import { RegistrationErrorStateMatcher } from '../register/register.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { AddEmployeeModel } from '../../store/models/AddEmployeeModel';

interface Roles {
  id: string;
  name: string;
}

interface Statuses {
  id: string;
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
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
})
export class AdminAddComponent {
  // selectedRole: string;
  // selectedStatus: string;
  addEmployeeForm: FormGroup;
  errorMatcher: ErrorStateMatcher;
  disableSelect = new FormControl(false);
  roles: Roles[] = [
    {id: '1', name: 'Courier'},
    {id: '2', name: 'Product Manager'}
  ];

  statuses: Statuses[] = [
    {id: '1', name: 'Active'},
    {id: '2', name: 'Terminated'},
    {id: '3', name: 'Inactive'}
  ];


  constructor(
    private formBuilder: FormBuilder,
    private messageService: EmployeeService
  ) {
    this.addEmployeeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      roleId: ['',[Validators.required]],
      statusId: ['',[Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(13)]],
    });

    this.errorMatcher = new RegistrationErrorStateMatcher();
  }

  onSubmit(addEmployeeForm: any, employeeForm: FormGroupDirective) {
    this.addEmployee();
    employeeForm.resetForm();
    window.alert('Employee has been added to the employee list!');

  }

public addEmployee(): void{

  const roleId = this.addEmployeeForm.get('roleId')?.value;
  const roleName = this.roles.find((el) => el.id == roleId)?.name;
  const statusId = this.addEmployeeForm.get('statusId')?.value;
  const statusName = this.statuses.find((el) => el.id == statusId)?.name;

  const addEmployeeData = {
    email: this.addEmployeeForm.get('email')?.value,
    firstName: this.addEmployeeForm.get('firstName')?.value,
    lastName: this.addEmployeeForm.get('lastName')?.value,
    roleId: roleId,
    roleName: roleName,
    statusId: statusId,
    statusName: statusName,
    phoneNumber: this.addEmployeeForm.get('phoneNumber')?.value,
  } as AddEmployeeModel;

    console.log(addEmployeeData);

    this.addEmployeeForm.controls.email.disable();
    this.addEmployeeForm.controls.firstName.disable();
    this.addEmployeeForm.controls.lastName.disable();
    this.addEmployeeForm.controls.roleId.disable();
    // this.addEmployeeForm.controls.roleName.disable();
    this.addEmployeeForm.controls.statusId.disable();
    // this.addEmployeeForm.controls.statusName.disable();
    this.addEmployeeForm.controls.phoneNumber.disable();

    this.messageService.addEmployee(addEmployeeData).subscribe(
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
        // this.addEmployeeForm.controls.roleName.enable();
        this.addEmployeeForm.controls.statusId.enable();
        // this.addEmployeeForm.controls.statusName.enable();
        this.addEmployeeForm.controls.phoneNumber.enable();
      }
    );
  }
}
