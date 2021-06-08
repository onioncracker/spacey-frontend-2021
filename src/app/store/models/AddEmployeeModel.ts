export class AddEmployeeModel {
  email: string;
  firstName: string;
  lastName: string;
  userRole: string;
  status: string;
  phoneNumber: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    userRole: string,
    status: string,
    phoneNumber: string
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userRole = userRole;
    this.status = status;
    this.phoneNumber = phoneNumber;
  }
}
