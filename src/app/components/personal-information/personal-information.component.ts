import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CheckoutDto} from "../../store/models/checkout";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PersonalInformation} from "../../store/models/personal-information";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})

export class PersonalInformationComponent implements OnInit, OnChanges{
  personalInformationForm!: FormGroup;
  @Input() personalInformation!: CheckoutDto
  isAuthUser = true
  isEdit = false

  edit() {
    this.isAuthUser = !this.isAuthUser
  }



  constructor(private formBuilder: FormBuilder) {
    this.personalInformationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(13)]],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      street: ['', [Validators.required, Validators.maxLength(50)]],
      house: ['', [Validators.required, Validators.maxLength(10)]],
      apartment: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.personalInformation) {
      this.personalInformationForm['firstName'].setValue(this.personalInformation.firstName);
    }
  }

  onSubmit(personalInformationForm: FormGroupDirective) {
  }
}
