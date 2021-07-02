import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css'],
})
export class AddAuctionComponent implements OnInit {
  auction!: AddAuction;
  addAuctionForm: FormGroup;
  products!: AuctionProductsModel[];
  sizes!: Sizes[];

  constructor(
    private route: ActivatedRoute,
    private addAuctionService: AddAuctionService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService
  ) {
    this.addAuctionForm = this.formBuilder.group({
      auctionProduct: ['', [Validators.required]],
      productSize: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      auctionName: ['', [Validators.required]],
      auctionType: [true, [Validators.required]],
      startPrice: [0, [Validators.required]],
      endPrice: [0, [Validators.required]],
      priceStep: [0, [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
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

    this.addAuctionService.addNewAuction(this.auction).subscribe((response) => {
      const data = response.body;
      console.log(data);
    });
  }

  allProducts() {
    this.addAuctionService
      .getAllProducts()
      .pipe()
      .subscribe((products: AuctionProductsModel[]) => {
        this.products = products;
      });
  }

  allSizes() {
    this.addAuctionService
      .getAllSizes()
      .pipe()
      .subscribe((sizes: Sizes[]) => {
        this.sizes = sizes;
      });
  }

  ngOnInit() {
    this.allProducts();
    this.allSizes();
  }
}
