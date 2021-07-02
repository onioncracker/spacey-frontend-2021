import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../store/service/auction/auction.service';
import { AuctionModel } from '../../store/models/auction.model';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['auction-details.component.css'],
})
export class AuctionDetailsComponent implements OnInit {
  auction!: AuctionModel;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
  ) {}

  getAuction() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.auctionService.getAuctionById(id).subscribe((auction) => {
      this.auction = auction;
    });
  }

  ngOnInit() {
    this.getAuction();
  }
}
