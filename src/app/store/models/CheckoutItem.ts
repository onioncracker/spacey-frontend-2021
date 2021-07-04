export default class CheckoutItem {
  productId!: number;
  name!: string;
  color!: string;
  size!: string;
  photo!: string;
  amount!: number;
  overallPrice!: number;

  constructor(
    productId: number,
    productName: string,
    color: string,
    sizeName: string,
    photo: string,
    amount: number,
    sum: number
  ) {
    this.productId = productId;
    this.name = productName;
    this.color = color;
    this.size = sizeName;
    this.photo = photo;
    this.amount = amount;
    this.overallPrice = sum;
  }
}
