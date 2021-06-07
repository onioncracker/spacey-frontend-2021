export class RegisterModel {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone_number: string | undefined;

  constructor(
    email: string,
    password: string,
    name: string,
    surname: string,
    phoneNumber = undefined
  ) {
    this.email = email;
    this.password = password;
    this.surname = surname;
    this.name = name;
    this.phone_number = phoneNumber;
  }
}
