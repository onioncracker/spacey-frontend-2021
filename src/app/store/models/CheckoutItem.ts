export default class CheckoutItem {
  productId!: number;
  productName!: string;
  color!: string;
  sizeName!: string;
  photo!: string;
  amount!: number;
  sum!: number;


  constructor(productId: number, productName: string, color: string, sizeName: string, photo: string, amount: number, sum: number) {
    this.productId = productId;
    this.productName = productName;
    this.color = color;
    this.sizeName = sizeName;
    this.photo = photo;
    this.amount = amount;
    this.sum = sum;
  }
}
