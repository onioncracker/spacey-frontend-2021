import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PAGE_PARAM} from "../filter/filter-params.constants";
import {ProductModel} from "../../store/models/product.model";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['pagination.component.css'],

})
export class PaginationComponent implements OnInit {

  @Input() items!: ProductModel[];
  @Output() selectPage = new EventEmitter();
  pageNumber!: number;

  getPageFromSessionStorage(): void {
    let stringNumber = (sessionStorage.getItem(PAGE_PARAM) || null) as string;
    this.pageNumber = +stringNumber;
  }

  onTogglePrev(): void {
    this.prevPage();
    this.selectPage.emit();
  }

  onToggleNext(): void {
    if (this.items.length === 8) {
      this.nextPage();
    }
    this.selectPage.emit();
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

  ngOnInit(): void {
    this.getPageFromSessionStorage();
  }
}
