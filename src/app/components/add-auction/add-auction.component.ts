import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { AddAuction } from '../../store/models/add-auction';
import { AuctionProductsModel } from '../../store/models/auction-products-model';
import { AddAuctionService } from '../../store/service/add-auction/add-auction.service';
import { Sizes } from '../../store/models/sizes';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { ErrorPageService } from '../../store/service/error/error-page.service';

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css'],
})
export class AddAuctionComponent implements OnInit {
  statuses: Array<string> = ['ACTIVE', 'INACTIVE'];
  types: Array<string> = ['INCREASE', 'DECREASE'];
  products!: AuctionProductsModel[];
  addAuctionForm: FormGroup;
  auction!: AddAuction;
  sizes!: Sizes[];

  constructor(
    private tokenStorageService: TokenStorageService,
    private addAuctionService: AddAuctionService,
    private errorPageService: ErrorPageService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder
  ) {
    this.addAuctionForm = this.formBuilder.group({
      auctionProduct: ['', [Validators.required]],
      productSize: ['', [Validators.required]],
      amount: [0, [Validators.min(0), Validators.required]],
      auctionName: ['', [Validators.required]],
      auctionType: [true, [Validators.required]],
      startPrice: [0, [Validators.min(0), Validators.required]],
      endPrice: [0, [Validators.min(0), Validators.required]],
      priceStep: [0, [Validators.min(0), Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  private isProductManagerRole(): boolean {
    let userRole = this.tokenStorageService.getRole();
    return userRole === 'PRODUCT_MANAGER';
  }

  onSubmit(addAuctionForm: any, auctionForm: FormGroupDirective) {
    this.addAuction();
    auctionForm.resetForm();
    this.dialogService.openMessage('Auction has been added', 'Close');
  }

  public addAuction(): void {
    this.auction = {
      auctionProduct: this.addAuctionForm.get('auctionProduct')?.value,
      productSize: this.addAuctionForm.get('productSize')?.value,
      amount: this.addAuctionForm.get('amount')?.value,
      auctionName: this.addAuctionForm.get('auctionName')?.value,
      auctionType: this.addAuctionForm.get('auctionType')?.value == 'INCREASE',
      startPrice: this.addAuctionForm.get('startPrice')?.value,
      endPrice: this.addAuctionForm.get('endPrice')?.value,
      priceStep: this.addAuctionForm.get('priceStep')?.value,
      startTime: this.addAuctionForm.get('startTime')?.value,
      endTime: this.addAuctionForm.get('endTime')?.value,
      status: this.addAuctionForm.get('status')?.value,
    };
    this.addAuctionForm.controls.auctionProduct.enable();
    this.addAuctionForm.controls.productSize.enable();
    this.addAuctionForm.controls.amount.enable();
    this.addAuctionForm.controls.auctionName.enable();
    this.addAuctionForm.controls.auctionType.enable();
    this.addAuctionForm.controls.startPrice.enable();
    this.addAuctionForm.controls.endPrice.enable();
    this.addAuctionForm.controls.priceStep.enable();
    this.addAuctionForm.controls.startTime.enable();
    this.addAuctionForm.controls.endTime.enable();
    this.addAuctionForm.controls.status.enable();

    this.addAuctionService.addNewAuction(this.auction).subscribe();
  }

  getProducts() {
    this.addAuctionService
      .getAllProducts()
      .pipe()
      .subscribe((products: AuctionProductsModel[]) => {
        this.products = products;
      });
  }

  getSizes() {
    this.addAuctionService
      .getAllSizes()
      .pipe()
      .subscribe((sizes: Sizes[]) => {
        this.sizes = sizes;
      });
  }

  ngOnInit() {
    this.getProducts();
    this.getSizes();
    if (!this.isProductManagerRole()) {
      this.errorPageService.openErrorPage('Access is denied');
    }
  }
}
