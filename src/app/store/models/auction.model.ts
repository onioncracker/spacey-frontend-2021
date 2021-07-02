import { SizeModel } from './size.model';
import { ProductAuctionModel } from './product-auction.model';

export class AuctionModel {
  auctionId!: number;
  userId!: number;
  auctionProduct!: ProductAuctionModel;
  productSize!: SizeModel;
  amount!: number;
  auctionName!: string;
  auctionType!: boolean;
  startPrice!: number;
  endPrice!: number;
  buyPrice!: number;
  startTime!: Date;
  endTime!: Date;
  status!: string;
}
