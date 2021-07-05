import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../store/service/auction/auction.service';
import { AuctionModel } from '../../store/models/auction.model';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['auction-details.component.css'],
})
export class AuctionDetailsComponent implements OnInit {
  auction!: AuctionModel;
  isUser = false;
  isProductManager = false;

  constructor(
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private auctionService: AuctionService
  ) {}

  getAuction() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.auctionService.getAuctionById(id).subscribe((auction) => {
      this.auction = auction;
    });
  }

  getUserRole(): void {
    const userRole = this.tokenStorageService.getRole();
    switch (userRole) {
      case null:
      case 'USER':
        this.isUser = true;
        break;
      case 'PRODUCT_MANAGER':
        this.isProductManager = true;
        break;
    }
  }

  ngOnInit() {
    this.getUserRole();
    this.getAuction();
  }
}
