import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompareService } from '../../store/service/comparison/compare.service';
import { SizesComparisonModel } from '../../store/models/sizes-comparison.model';
import { ProductModel } from '../../store/models/product.model';
import { routeUrls } from '../../../environments/router-manager';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit {
  products: ProductModel[] = [];
  sizes!: SizesComparisonModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private comparisonService: CompareService
  ) {}

  getAllComparison() {
    if (sessionStorage.getItem('token')) {
      this.comparisonService
        .getAllCompareProduct()
        .pipe()
        .subscribe((products: ProductModel[]) => {
          this.products = products;
          localStorage.setItem('comparisonArray', JSON.stringify(products));
        });
    } else {
      this.products =
        this.comparisonService.getAllComparedProductsFromLocalStorage();
    }
  }

  trackByFn(index: any, item: { id: any }) {
    return item.id;
  }

  deleteProductFromCompare(id: number) {
    if (sessionStorage.getItem('token')) {
      this.comparisonService.deleteCompareProduct(id).subscribe();
      this.filterProductArray(id);
    } else {
      this.filterProductArray(id);
      this.comparisonService.deleteLocalStorageProduct(id);
      console.log(id);
    }
  }

  filterProductArray(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  routeToProductCatalog(sex: string) {
    this.router.navigate([routeUrls.productCatalog], {
      queryParams: { sex: sex },
    });
  }

  ngOnInit() {
    this.getAllComparison();
  }
}
