import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../store/service/header/header-title.service';
import { ProductService } from '../../store/service/product/product.service';
import { ProductModel } from '../../store/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CATEGORIES_PARAM,
  COLORS_PARAM,
  SEX_PARAM,
} from '../filter/filter-params.constants';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['products-catalog.component.css'],
})
export class ProductsCatalogComponent implements OnInit, OnDestroy {
  public showFilter = false;
  products: ProductModel[] = [];
  sexQueryParam = '';

  private destroyStream = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private headerTitleService: HeaderTitleService,
    private productService: ProductService
  ) {}

  public onToggleFilters(): void {
    this.showFilter = !this.showFilter;
  }

  getProducts(queryString: string): void {
    this.productService
      .getProductsByQuery(queryString)
      .subscribe((products: ProductModel[]) => {
        this.products = products;
      });
  }

  getQueryStringByFilter(name, data) {
    if (data && data.length) {
      const selectedFilters = data
        .filter((i) => i.isSelected)
        .map((i) => i.name)
        .join(',');
      return selectedFilters ? `${name}=${selectedFilters}` : '';
    }
    return '';
  }

  getFiltersQueryString(...args) {
    let qs = '';

    args.forEach((i) => {
      if (i) {
        qs += qs ? `&${i}` : `?${i}`;
      }
    });

    return qs;
  }

  handleSexQueryParam() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroyStream))
      .subscribe((i) => {
        this.sexQueryParam = `${SEX_PARAM}=${i.sex}` || '';
        this.handleProducts();
        this.headerTitleService.setTitle(i.sex);
      });
  }

  handleProducts(): void {
    const categoriesSessionStorage = (sessionStorage.getItem(
      CATEGORIES_PARAM
    ) || null) as string;
    const colorsSessionStorage = (sessionStorage.getItem(COLORS_PARAM) ||
      null) as string;
    const categories = this.getQueryStringByFilter(
      CATEGORIES_PARAM,
      JSON.parse(categoriesSessionStorage)
    );
    const colors = this.getQueryStringByFilter(
      COLORS_PARAM,
      JSON.parse(colorsSessionStorage)
    );
    const queryString = this.getFiltersQueryString(
      this.sexQueryParam,
      categories,
      colors
    );
    this.getProducts(queryString);
  }

  onSelectedFilter(): void {
    this.handleProducts();
  }

  ngOnInit(): void {
    this.handleSexQueryParam();
    this.handleProducts();
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
