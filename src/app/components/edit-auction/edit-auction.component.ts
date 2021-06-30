import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryColorMaterialsModel } from '../../store/models/category-color-materials.model';
import { Sizes } from '../../store/models/sizes';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { routeUrls } from '../../../environments/router-manager';
import {EditAuction} from "../../store/models/edit-auction";
import {AuctionProductsModel} from "../../store/models/auction-products-model";
import {EditAuctionService} from "../../store/service/edit-auction/edit-auction.service";
import {AddAuctionService} from "../../store/service/add-auction/add-auction.service";

@Component({
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html',
  styleUrls: ['./edit-auction.component.css'],
})
export class EditAuctionComponent implements OnInit {
  auction!: EditAuction;
  sizes!: Sizes[];
  products!: AuctionProductsModel[];
  sizesList!: CategoryColorMaterialsModel[];

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
    id: ['', [Validators.required]],
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

  onSubmit() {
    this.auction = this.editAuctionForm.value;
    this.updateAuction(this.auction);
    this.dialogService.openMessage('Auction has been updated', 'close');
  }

  getAuction(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.editAuctionService
      .getAuctionById(id)
      .pipe()
      .subscribe((auction: EditAuction) => {
        this.auction = new EditAuction(
          auction.id,
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
    this.editAuctionService.updateAuctionById(auction).subscribe();
  }

  deleteAuction(id: number) {
    this.dialogService.openConfirm(this.options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.editAuctionService.deleteAuctionById(id).subscribe(() => {
          this.dialogService.openMessage('Product has been deleted', 'close');
          this.goAuctionsCatalog();
        });
      }
    });
  }

  goAuctionsCatalog() {
    this.router.navigateByUrl(routeUrls.productCatalog);
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

  ngOnInit() {
    this.allProducts();
    this.allSizes();
    this.getAuction();
  }
}
