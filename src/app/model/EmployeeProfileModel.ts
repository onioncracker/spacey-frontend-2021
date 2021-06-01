export class EmployeeProfileModel{
  firstName!: string;
  secondName!: string;
  email!: string;
  phoneNumber!: string;
  role!: string;
  status!: string;

  constructor(firstName: string, secondName: string, email: string,
              phoneNumber: string, role: string, status: string) {
    this.firstName = firstName;
    this.email = email;
    this.secondName = secondName;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.status = status;
  }

}
