export class AuctionBidModel {
  auctionId!: number;
  buyPrice!: number;

  constructor(auctionId: number, buyPrice: number) {
    this.auctionId = auctionId;
    this.buyPrice = buyPrice;
  }
}
