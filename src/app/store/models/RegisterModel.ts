export class RegisterModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    this.email = email;
    this.password = password;
    this.lastName = lastName;
    this.firstName = firstName;
  }
}
