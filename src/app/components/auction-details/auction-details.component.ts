import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../store/service/auction/auction.service';
import { AuctionModel } from '../../store/models/auction.model';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { EditAuctionService } from '../../store/service/edit-auction/edit-auction.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['auction-details.component.css'],
})
export class AuctionDetailsComponent implements OnInit {
  auction!: AuctionModel;
  isUser = false;
  isProductManager = false;
  bid!: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private auctionService: AuctionService,
    private editAuctionService: EditAuctionService,
    private tokenStorageService: TokenStorageService
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

  bidForm = this.formBuilder.group({
    buyPrice: [0, [Validators.required]],
  });

  onSubmit() {
    this.bid = this.bidForm.value.buyPrice;
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.updateAuctionBid(id, this.bid);
  }

  updateAuctionBid(bid: number, id: number) {
    this.editAuctionService
      .updateBid(bid, id)
      .pipe(
        catchError((error) => {
          this.dialogService.openMessage(error.error.message, 'close');
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response !== null) {
          this.dialogService.openMessage('Bet is made', 'Close');
        }
      });
  }

  ngOnInit() {
    this.getUserRole();
    this.getAuction();
  }
}
