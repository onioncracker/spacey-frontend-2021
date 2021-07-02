import { AuctionProductsModel } from './auction-products-model';
import { Sizes } from './sizes';

export class EditAuction {
  auctionId!: number;
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
    auctionId: number,
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
    this.auctionId = auctionId;
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
