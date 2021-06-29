export class ProductCreateOrderDto {
  productId: number;
  sizeId: number;
  amount: number;
  sum: number;

  constructor(productId: number, sizeId: number, amount: number, sum: number) {
    this.productId = productId;
    this.sizeId = sizeId;
    this.amount = amount;
    this.sum = sum;
  }
}
