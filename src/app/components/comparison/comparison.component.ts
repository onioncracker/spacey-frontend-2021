import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompareService } from '../../store/service/comparison/compare.service';
import { Comparison } from '../../store/models/comparison';
import { DeleteCompareProduct } from '../../store/models/deleteCompareProduct';
import { SizesComparison } from '../../store/models/sizesComparison';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit {
  products!: Comparison[];
  sizes!: SizesComparison[];
  deleteProduct!: DeleteCompareProduct;

  constructor(
    private route: ActivatedRoute,
    private comparisonService: CompareService
  ) {}

  getAllComparison() {
    this.comparisonService
      .getAllCompareProduct(4)
      .pipe()
      .subscribe((products: Comparison[]) => {
        this.products = products;
        console.log();
      });
  }

  //deleteComparisonProduct() {
  //this.comparisonService
  //.deleteCompareProduct(this.deleteProduct)
  //.pipe()
  //.subscribe((deleteProduct:DeleteCompareProduct) => {
  //this.deleteProduct = deleteProduct;
  //})
  //}

  ngOnInit() {
    this.getAllComparison();
    //this.deleteComparisonProduct();
  }
}
