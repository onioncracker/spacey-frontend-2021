export default class CheckoutItem {
  productId!: number;
  name!: string;
  color!: string;
  sizeId!: number;
  size!: string;
  photo!: string;
  amount!: number;
  overallPrice!: number;

  constructor(
    productId: number,
    name: string,
    color: string,
    sizeId: number,
    sizeName: string,
    photo: string,
    amount: number,
    overallPrice: number
  ) {
    this.productId = productId;
    this.name = name;
    this.color = color;
    this.sizeId = sizeId;
    this.size = sizeName;
    this.photo = photo;
    this.amount = amount;
    this.overallPrice = overallPrice;
  }
}
