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
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { ErrorPageService } from '../../store/service/error/error-page.service';

@Component({
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrls: ['./edit-auction.component.css'],
})
export class EditAuctionComponent implements OnInit {
  products!: AuctionProductsModel[];
  auction!: EditAuction;
  statuses!: string[];
  auctionId: number;
  types!: boolean[];
  sizes!: Sizes[];
  type!: string;

  options = {
    title: 'Do you want to delete a auction?',
    message: 'This auction will be permanently removed',
    cancelText: 'CANCEL',
    confirmText: 'CONTINUE',
  };

  constructor(
    private tokenStorageService: TokenStorageService,
    private editAuctionService: EditAuctionService,
    private addAuctionService: AddAuctionService,
    private errorPageService: ErrorPageService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.auctionId = parseInt(this.route.snapshot.paramMap.get('id')!);
  }

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

  private isProductManagerRole(): boolean {
    let userRole = this.tokenStorageService.getRole();
    return userRole === 'PRODUCT_MANAGER';
  }

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

  deleteAuction() {
    this.dialogService.openConfirm(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.editAuctionService
          .deleteAuctionById(this.auctionId)
          .subscribe(() => {
            this.dialogService.openMessage('Auction has been deleted', 'close');
            this.navigateToAuctionsCatalog();
          });
      }
    });
  }

  navigateToAuctionsCatalog() {
    this.router.navigateByUrl(routeUrls.auctionCatalog);
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
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

  getTypes() {
    this.types = new Array<boolean>();
    this.types.push(true, false);
  }

  getStatuses() {
    this.statuses = new Array<string>();
    this.statuses.push('ACTIVE', 'INACTIVE');
  }

  ngOnInit() {
    this.getProducts();
    this.getTypes();
    this.getSizes();
    this.getStatuses();
    this.getAuction();
    if (!this.isProductManagerRole()) {
      this.errorPageService.openErrorPage('Access is denied');
    }
  }
}
