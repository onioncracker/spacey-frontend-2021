export class EmployeeModel {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  tokenId: number | undefined;
  roleId: number;
  roleName: string;
  statusId: number;
  statusName: string;
  phoneNumber: string;

  constructor(
    userId: number,
    email: string,
    firstName: string,
    lastName: string,
    tokenId: number,
    roleId: number,
    roleName: string,
    statusId: number,
    statusName: string,
    phoneNumber: string
  ) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tokenId = tokenId;
    this.roleId = roleId;
    this.roleName = roleName;
    this.statusId = statusId;
    this.statusName = statusName;
    this.phoneNumber = phoneNumber;
  }
}
