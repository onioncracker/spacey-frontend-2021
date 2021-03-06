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
import { ErrorStateMatcher } from '@angular/material/core';
import { RegistrationErrorStateMatcher } from '../register/register.component';
import { AddEmployeeModel } from '../../store/models/AddEmployeeModel';
import { EmployeeModel } from '../../store/models/EmployeeModel';

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
export class AdminEditComponent {
  editEmployeeForm: FormGroup;
  errorMatcher: ErrorStateMatcher;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: EmployeeService
  ) {
    this.editEmployeeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      roleId: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(13)]],
    });

    this.errorMatcher = new RegistrationErrorStateMatcher();
  }

  onSubmit(editEmployeeForm: any, employeeForm: FormGroupDirective) {
    this.editEmployee();
    employeeForm.resetForm();
    window.alert('Employee has been edited!');
  }

  public editEmployee(): void {
    const editEmployeeData = {
      email: this.editEmployeeForm.get('email')?.value,
      firstName: this.editEmployeeForm.get('firstName')?.value,
      lastName: this.editEmployeeForm.get('lastName')?.value,
      roleId: this.editEmployeeForm.get('roleId')?.value,
      statusId: this.editEmployeeForm.get('statusId')?.value,
      phoneNumber: this.editEmployeeForm.get('phoneNumber')?.value,
    } as AddEmployeeModel;

    console.log(editEmployeeData);

    this.editEmployeeForm.controls.email.disable();
    this.editEmployeeForm.controls.firstName.disable();
    this.editEmployeeForm.controls.lastName.disable();
    this.editEmployeeForm.controls.roleId.disable();
    this.editEmployeeForm.controls.statusId.disable();
    this.editEmployeeForm.controls.phoneNumber.disable();

    this.messageService.addEmployee(editEmployeeData).subscribe(
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
}
