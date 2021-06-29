export class PersonalInformation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  street: string;
  house: string;
  apartment: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    city: string,
    street: string,
    house: string,
    apartment: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.city = city;
    this.street = street;
    this.house = house;
    this.apartment = apartment;
  }
}
