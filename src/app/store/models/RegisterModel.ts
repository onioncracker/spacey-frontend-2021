export class RegisterModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | undefined;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber = undefined
  ) {
    this.email = email;
    this.password = password;
    this.lastName = lastName;
    this.firstName = firstName;
    this.phoneNumber = phoneNumber;
  }
}
