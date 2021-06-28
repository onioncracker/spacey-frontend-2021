import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderTitleService} from '../../store/service/header/header-title.service';
import {ProductService} from '../../store/service/product/product.service';
import {ProductModel} from '../../store/models/product.model';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {
  CATEGORIES_PARAM,
  COLORS_PARAM, PAGE_PARAM, PRICE_PARAM,
  SEX_PARAM,
} from '../filter/filter-params.constants';
import {SORTING_PARAM} from "../sorting/sorting-params.constants";

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['products-catalog.component.css'],
})
export class ProductsCatalogComponent implements OnInit, OnDestroy {

  public showFilter = false;
  products: ProductModel[] = [];
  sexQueryParam = '';
  pageNumber!: number;
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

  getPageFromSessionStorage(): void {
    let stringNumber = (sessionStorage.getItem(PAGE_PARAM) || null) as string;
    this.pageNumber = +stringNumber;
  }

  onTogglePrev(): void {
    this.prevPage();
    this.handleProducts();
  }

  onToggleNext(): void {
    if (this.products.length === 8) {
      this.nextPage();
      this.handleProducts();
    }
  }

  prevPage(): void {
    let savedPage = sessionStorage.getItem('pageNum');
    if (savedPage === null) {
      sessionStorage.setItem('pageNum', '0');
    } else if (+savedPage > 0) {
      let prevPage = +savedPage;
      prevPage--;
      this.pageNumber = prevPage;
      sessionStorage.setItem('pageNum', prevPage.toString());
    }
  }

  nextPage(): void {
    let savedPage = sessionStorage.getItem('pageNum');
    if (savedPage === null) {
      sessionStorage.setItem('pageNum', '0');
    } else {
      let nextPage = +savedPage;
      nextPage++;
      this.pageNumber = nextPage;
      sessionStorage.setItem('pageNum', nextPage.toString());
    }
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

  getQueryStringByName(name, data) {
    if (data && data.length) {
      const selectedFilters = data;
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

  handleSexQueryParam(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroyStream))
      .subscribe((i) => {
        this.sexQueryParam = `${SEX_PARAM}=${i.sex}` || '';
        this.handleProducts();
        this.headerTitleService.setTitle(i.sex);
      });
  }

  handleProducts(): void {
    const categoriesSessionStorage = (sessionStorage.getItem(CATEGORIES_PARAM) || null) as string;
    const colorsSessionStorage = (sessionStorage.getItem(COLORS_PARAM) || null) as string;
    const sortingSessionStorage = (sessionStorage.getItem(SORTING_PARAM) || null) as string;
    const pageNumberSessionStorage = (sessionStorage.getItem(PAGE_PARAM) || null) as string;
    const categories = this.getQueryStringByFilter(CATEGORIES_PARAM, JSON.parse(categoriesSessionStorage));
    const colors = this.getQueryStringByFilter(COLORS_PARAM, JSON.parse(colorsSessionStorage));
    const sorting = this.getQueryStringByName(SORTING_PARAM, sortingSessionStorage);
    const page = this.getQueryStringByName(PAGE_PARAM, pageNumberSessionStorage);
    const queryString = this.getFiltersQueryString(this.sexQueryParam, categories, colors, sorting, page);
    this.getProducts(queryString);
  }

  onSelectedFilter(): void {
    this.handleProducts();
  }

  onSelectedSorting(): void {
    this.handleProducts();
  }

  ngOnInit(): void {
    this.handleSexQueryParam();
    this.handleProducts();
    this.getPageFromSessionStorage();
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
