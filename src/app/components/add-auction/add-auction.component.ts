import { Component, OnInit } from '@angular/core';
import {AddProduct} from "../../store/models/addProduct";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CatergoryMaterialsAdd} from "../../store/models/catergoryMaterialsAdd";
import {SizesAdd} from "../../store/models/sizesAdd";
import {AddAuction} from "../../store/models/add-auction";
import {Product} from "../../store/models/product";
import {ActivatedRoute} from "@angular/router";
import {AddProductService} from "../../store/service/add-product/add-product.service";
import {AddAuctionService} from "../../store/service/add-auction/add-auction.service";

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css']
})
export class AddAuctionComponent implements OnInit {
  auction!: AddAuction;
  addAuctionForm: FormGroup;
  sizesList!: SizesAdd[];
  productList!: Product[];

  constructor(private route: ActivatedRoute,
      private addProductService: AddAuctionService,
      private formBuilder: FormBuilder
  ) {
  this.addAuctionForm = this.formBuilder.group({
    auctionName: ['', [Validators.required]],
    product: ['', [Validators.required]],
    size: ['', [Validators.required]],
    amount: [0, [Validators.required]],
    type: [true, [Validators.required]],
    startPrice: ['', [Validators.required]],
    endPrice: ['-', [Validators.required]],
    priceStep: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]]
  });
  }

  ngOnInit(): void {
  }

}
