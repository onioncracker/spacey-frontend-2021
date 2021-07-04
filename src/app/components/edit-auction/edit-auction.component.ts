import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Sizes } from '../../store/models/sizes';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { routeUrls } from '../../../environments/router-manager';
import { EditAuction } from '../../store/models/edit-auction';
import { AuctionProductsModel } from '../../store/models/auction-products-model';
import { EditAuctionService } from '../../store/service/edit-auction/edit-auction.service';
import { AddAuctionService } from '../../store/service/add-auction/add-auction.service';

@Component({
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrls: ['./edit-auction.component.css'],
})
export class EditAuctionComponent implements OnInit {
  auction!: EditAuction;
  products!: AuctionProductsModel[];
  sizes!: Sizes[];
  types!: boolean[];
  type!: string;
  statuses!: string[];
  auctionId = parseInt(this.route.snapshot.paramMap.get('id')!);

  options = {
    title: 'Do you want to delete a auction?',
    message: 'This auction will be permanently removed',
    cancelText: 'CANCEL',
    confirmText: 'CONTINUE',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addAuctionService: AddAuctionService,
    private formBuilder: FormBuilder,
    private editAuctionService: EditAuctionService,
    private dialogService: DialogService
  ) {}

  editAuctionForm = this.formBuilder.group({
    auctionId: ['', [Validators.required]],
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

  onSubmit() {
    this.auction = this.editAuctionForm.value;
    this.updateAuction(this.auction);
    this.dialogService.openMessage('Auction has been updated', 'close');
  }

  getAuction(): void {
    this.editAuctionService
      .getAuctionById(this.auctionId)
      .pipe()
      .subscribe((auction: EditAuction) => {
        this.auction = new EditAuction(
          auction.auctionId,
          auction.auctionProduct,
          auction.productSize,
          auction.amount,
          auction.auctionName,
          auction.auctionType,
          auction.startPrice,
          auction.endPrice,
          auction.priceStep,
          auction.startTime,
          auction.endTime,
          auction.status
        );
        this.editAuctionForm.setValue(this.auction);
      });
  }

  updateAuction(auction: EditAuction) {
    this.editAuctionService
      .updateAuctionById(auction, this.auctionId)
      .subscribe();
  }

  deleteAuction(id: number) {
    this.dialogService.openConfirm(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.editAuctionService
          .deleteAuctionById(this.auctionId)
          .subscribe(() => {
            this.dialogService.openMessage('Auction has been deleted', 'close');
            this.goAuctionsCatalog();
          });
      }
    });
  }

  goAuctionsCatalog() {
    this.router.navigateByUrl(routeUrls.auctionCatalog);
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
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

  allTypes() {
    this.types = new Array<boolean>();
    this.types.push(true, false);
  }

  allStatuses() {
    this.statuses = new Array<string>();
    this.statuses.push('ACTIVE', 'INACTIVE');
  }

  ngOnInit() {
    this.editAuctionForm.controls.auctionId.disable();
    this.allProducts();
    this.allTypes();
    this.allSizes();
    this.allStatuses();
    this.getAuction();
  }
}
