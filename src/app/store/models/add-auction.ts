import { Sizes } from './sizes';
import { AuctionProductsModel } from './auction-products-model';

export class AddAuction {
  auctionProductId!: number;
  productSize!: Sizes;
  amount!: number;
  auctionName!: string;
  auctionType!: boolean;
  startPrice!: number;
  endPrice!: number;
  priceStep!: number;
  startTime!: Date;
  endTime!: Date;
  status!: string;

  constructor(
    auctionProductId: number,
    productSize: Sizes,
    amount: number,
    auctionName: string,
    auctionType: boolean,
    startPrice: number,
    endPrice: number,
    priceStep: number,
    startTime: Date,
    endTime: Date,
    status: string
  ) {
    this.auctionProductId = auctionProductId;
    this.productSize = productSize;
    this.amount = amount;
    this.auctionName = auctionName;
    this.auctionType = auctionType;
    this.startPrice = startPrice;
    this.endPrice = endPrice;
    this.priceStep = priceStep;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
  }
}
