import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ColorModel } from '../../store/models/color.model';
import { CategoryModel } from '../../store/models/category.model';
import { ProductService } from '../../store/service/product/product.service';
import {IPrice, PricesMock} from '../../store/models/price.model';
import { Observable } from 'rxjs';
import {CATEGORIES_PARAM, COLORS_PARAM, PRICE_PARAM} from './filter-params.constants';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output() selectFilterItem = new EventEmitter();

  categoryFilter: CategoryModel[] = [];
  colorFilter: ColorModel[] = [];
  priceFilter = PricesMock;

  constructor(private productService: ProductService) {}

  getCategoriesList(): void {
    this.productService
      .getCategories()
      .subscribe((categoryFilter: CategoryModel[]) => {
        this.categoryFilter = categoryFilter;
      });
  }

  getColorsList(): void {
    this.productService.getColors().subscribe((colorFilter: ColorModel[]) => {
      this.colorFilter = colorFilter;
    });
  }

  get pricesList(): Observable<IPrice[]> {
    return this.productService.getPrices();
  }

  getFiltersList(): void {
    this.getCategoriesList();
    this.getColorsList();
  }

  savedFilters(): void {
    let savedCategories = sessionStorage.getItem(CATEGORIES_PARAM);
    if (savedCategories != null)
      this.categoryFilter = JSON.parse(savedCategories);

    let savedColors = sessionStorage.getItem(COLORS_PARAM);
    if (savedColors != null)
      this.colorFilter = JSON.parse(savedColors);

    let savedPrice = sessionStorage.getItem(PRICE_PARAM);
    if (savedPrice != null)
      this.priceFilter = JSON.parse(savedPrice);
  }

  selectedFilters(): void {
    if (
      sessionStorage.getItem(CATEGORIES_PARAM) === null ||
      sessionStorage.getItem(COLORS_PARAM) === null ||
      sessionStorage.getItem(PRICE_PARAM) === null
    ) {
      this.getFiltersList();
    } else {
      this.savedFilters();
    }
  }

  ngOnInit(): void {
    this.selectedFilters();
  }

/*  onChange(event): void {
    const priceFilter = event.value;
    sessionStorage.setItem(PRICE_PARAM, priceFilter);
    this.selectFilterItem.emit();
  }*/

  changeSelection(): void {
    sessionStorage.setItem(CATEGORIES_PARAM, JSON.stringify(this.categoryFilter));
    sessionStorage.setItem(COLORS_PARAM, JSON.stringify(this.colorFilter));
    sessionStorage.setItem(PRICE_PARAM, JSON.stringify(this.priceFilter));
    this.selectFilterItem.emit();
  }
}
