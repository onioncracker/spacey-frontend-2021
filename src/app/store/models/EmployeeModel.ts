export class EmployeeModel {
  loginId: string;
  email: string;
  firstName: string;
  lastName: string;
  userRole: string;
  status: string;
  phoneNumber: string;

  constructor(
    loginId: string,
    email: string,
    firstName: string,
    lastName: string,
    userRole: string,
    status: string,
    phoneNumber: string
  ) {
    this.loginId = loginId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userRole = userRole;
    this.status = status;
    this.phoneNumber = phoneNumber;
  }
}
