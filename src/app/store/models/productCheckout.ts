export class ProductCheckoutDto {
  productId: number;
  productName: string;
  color: string;
  colorId: number;
  sizeName: string;
  sizeId: number;
  photo: string;
  amount: number;
  sum: number;


  constructor(productId: number, productName: string, color: string, colorId: number, sizeName: string, sizeId: number, photo: string, amount: number, sum: number) {
    this.productId = productId;
    this.productName = productName;
    this.color = color;
    this.colorId = colorId;
    this.sizeName = sizeName;
    this.sizeId = sizeId;
    this.photo = photo;
    this.amount = amount;
    this.sum = sum;
  }
}
