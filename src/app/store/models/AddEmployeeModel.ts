export class AddEmployeeModel {
  email: string;
  firstName: string;
  lastName: string;
  roleId: number;
  roleName: string;
  statusId: number;
  statusName: string;
  phoneNumber: string;

  constructor(
    email: string,
    firstName: string,
    lastName: string,
    roleId: number,
    roleName: string,
    statusId: number,
    statusName: string,
    phoneNumber: string
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.roleName = roleName;
    this.statusId = statusId;
    this.statusName = statusName;
    this.phoneNumber = phoneNumber;
  }
}
