export class EmployeeModel {
  userId: string;
  email: string;
  roleId: string;
  roleName: string;
  firstName: string;
  lastName: string;
  statusId: string;
  statusName: string;
  phoneNumber: string;

  constructor(
    userId: string,
    email: string,
    roleId: string,
    roleName: string,
    firstName: string,
    lastName: string,
    statusId: string,
    statusName: string,
    phoneNumber: string
  ) {
    this.userId = userId;
    this.email = email;
    this.roleId = roleId;
    this.roleName = roleName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.statusId = statusId;
    this.statusName = statusName;
    this.phoneNumber = phoneNumber;
  }
}
