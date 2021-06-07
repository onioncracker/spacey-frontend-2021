import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../store/service/user/userService';
import { User } from '../../store/models/user';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User | undefined;
  registerForm;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,30}'),
        ],
      ],
      name: ['', [Validators.required, Validators.maxLength(40)]],
      surname: ['', [Validators.required, Validators.maxLength(40)]],
      role: ['', Validators.required],
    });
  }

  onSubmit(customerData: any) {
    this.service
      .checkIfEmailExists(this.registerForm.value.email)
      .subscribe((val) => {
        if (!val) {
          const form = this.registerForm.value;
          form.password = btoa(this.registerForm.value.password);

          this.service.addUser(form);

          console.log('User created successfully!');
        } else {
          console.log('User with such email already exists');
        }
      });
  }
}