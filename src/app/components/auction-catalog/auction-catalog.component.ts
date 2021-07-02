import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../store/service/auction/auction.service';
import { HeaderTitleService } from '../../store/service/header/header-title.service';
import { AuctionModel } from '../../store/models/auction.model';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './auction-catalog.component.html',
  styleUrls: ['auction-catalog.component.css'],
})
export class AuctionCatalogComponent implements OnInit {
  auctions: AuctionModel[] = [];

  constructor(
    private headerTitleService: HeaderTitleService,
    private auctionService: AuctionService
  ) {}

  getAuctions(): void {
    this.auctionService
      .getAllAuctions()
      .subscribe((auctions: AuctionModel[]) => {
        this.auctions = auctions;
      });
  }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Auctions');
    this.getAuctions();
  }
}
