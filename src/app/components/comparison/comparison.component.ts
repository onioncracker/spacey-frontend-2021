import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompareService } from '../../store/service/comparison/compare.service';
import { SizesComparison } from '../../store/models/sizesComparison';
import {Product} from "../../store/models/product";
import {MatDialog} from "@angular/material/dialog";
import {DialogMessageComponent} from "../dialog-message/dialog-message.component";

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit {
  products: Product[] = [];
  sizes!: SizesComparison[];

  constructor(
    private route: ActivatedRoute,
    private comparisonService: CompareService,
    private dialog: MatDialog,
  ) {}

  openDialog() {
    this.dialog.open(DialogMessageComponent);
  }

  getAllComparison() {
     if (sessionStorage.getItem("token")) {
       this.comparisonService
         .getAllCompareProduct()
         .pipe()
         .subscribe((products: Product[]) => {
           this.products = products;
           localStorage.setItem("comparisonArray", JSON.stringify(products));
         });
     }
     else {
       this.products = this.comparisonService.getAllComparedProductsFromLocalStorage();
     }
  }

  trackByFn(index: any, item: { id: any; }) {
    return item.id;
  }

  deleteProductFromCompare (id: number) {
    if (sessionStorage.getItem("token")) {
      this.comparisonService.deleteCompareProduct(id).subscribe();
      this.filterProductArray(id);
    }
    else {
      this.filterProductArray(id);
      this.comparisonService.deleteLocalStorageProduct(id);
      console.log(id);
    }
  }

  filterProductArray(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }

  ngOnInit() {
    this.getAllComparison();
  }
}
