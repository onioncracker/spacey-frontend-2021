import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalInformation } from '../../store/models/personal-information';
import { CheckoutOrder } from '../../store/models/checkout-order';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css'],
})
export class PersonalInformationComponent implements OnInit, OnChanges {
  personalInformationForm!: FormGroup;
  @Output() personalInformationEvent = new EventEmitter<FormGroup>();
  userContactInfo!: PersonalInformation;
  @Input() personalInformation!: CheckoutOrder;
  isEdit!: boolean;
  isAuthUser!: boolean;

  onFormDataChange() {
    this.personalInformationEvent.emit(this.personalInformationForm);
  }

  edit() {
    this.isEdit = !this.isEdit;
    this.isAuthUser = !this.isAuthUser;
  }


  constructor(private formBuilder: FormBuilder) {
    this.personalInformationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
        ],
      ],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      street: ['', [Validators.required, Validators.maxLength(50)]],
      house: ['', [Validators.required, Validators.maxLength(10)]],
      apartment: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('token'));
    if (this.isUserLogin()) {
      this.isAuthUser = true;
      this.isEdit = false;
    }
  }

  ngOnChanges(): void {
    this.userContactInfo = new PersonalInformation(
      this.personalInformation.ordererFirstName,
      this.personalInformation.ordererLastName,
      this.personalInformation.phoneNumber,
      this.personalInformation.email,
      this.personalInformation.city,
      this.personalInformation.street,
      this.personalInformation.house,
      this.personalInformation.apartment
    );
    this.personalInformationForm.setValue(this.userContactInfo);
  }

  isUserLogin(): boolean {
    return sessionStorage.getItem('token') != null;
  }
}
