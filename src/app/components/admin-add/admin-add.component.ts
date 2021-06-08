import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { User } from '../../store/models/user';
import { EmployeeModel } from '../../store/models/EmployeeModel';
import { AuthService } from '../../store/service/auth/AuthService';
import { TokenStorageService } from '../../store/service/auth/TokenStorageService';
import { EmployeeService } from '../../store/service/employee/employeeService';
import { RegistrationErrorStateMatcher } from '../register/register.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { RegisterModel } from '../../store/models/RegisterModel';
import { Router } from '@angular/router';
import { AddEmployeeModel } from '../../store/models/AddEmployeeModel';
// import {AddEmpService} from "../../store/service/emp/AddEmpService";

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
  employee: EmployeeModel | undefined;
  addEmployeeForm: FormGroup;
  errorMatcher: ErrorStateMatcher;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: EmployeeService
  ) {
    this.addEmployeeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      userRole: ['', [Validators.required, Validators.maxLength(30)]],
      status: ['', [Validators.required, Validators.maxLength(30)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(13)]],
    });

    this.errorMatcher = new RegistrationErrorStateMatcher();
  }

  onSubmit() {
    this.addEmployee();
  }

  public addEmployee(): void {
    const addEmployeeData = {
      email: this.addEmployeeForm.get('email')?.value,
      firstName: this.addEmployeeForm.get('firstName')?.value,
      lastName: this.addEmployeeForm.get('lastName')?.value,
      userRole: this.addEmployeeForm.get('userRole')?.value,
      status: this.addEmployeeForm.get('status')?.value,
      phoneNumber: this.addEmployeeForm.get('phoneNumber')?.value,
    } as AddEmployeeModel;

    this.addEmployeeForm.controls.email.disable();
    this.addEmployeeForm.controls.firstName.disable();
    this.addEmployeeForm.controls.lastName.disable();
    this.addEmployeeForm.controls.userRole.disable();
    this.addEmployeeForm.controls.status.disable();
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
        this.addEmployeeForm.controls.userRole.enable();
        this.addEmployeeForm.controls.status.enable();
        this.addEmployeeForm.controls.phoneNumber.enable();
      }
    );
  }
}
