import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISorting, SortingMock} from "../../store/models/sorting.model";
import {SORTING_PARAM} from "./sorting-params.constants";
import {Observable} from "rxjs";
import {ProductService} from "../../store/service/product/product.service";

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['sorting.component.css'],
})
export class SortingComponent {

  @Output() selectSortingItem = new EventEmitter();
  selected = 'new';

  constructor(private productService: ProductService) {}

  get sortingList(): Observable<ISorting[]> {
    return this.productService.getSorting();
  }

  changeSorting(event): void {
    if(event.isUserInput) {
      let sortingValue = event.source.value
      let savedSorting = sessionStorage.getItem(SORTING_PARAM);
      if (savedSorting === null) {
        sessionStorage.setItem(SORTING_PARAM, this.selected);
      } else {
        sessionStorage.setItem(SORTING_PARAM, sortingValue);
      }
    }
    this.selectSortingItem.emit();
  }
}
