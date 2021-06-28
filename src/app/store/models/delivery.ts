export class Delivery {
  date!: Date;
  doNotDisturb!: boolean;
  noContact!: boolean;


  constructor(date: Date, doNotDisturb: boolean, noContact: boolean) {
    this.date = date;
    this.doNotDisturb = doNotDisturb;
    this.noContact = noContact;
  }
}
