import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ProductModel } from '../../store/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() items!: ProductModel[];
  @Output() selectPage = new EventEmitter<number>();
  pageNumber = 0;
  private destroyStream = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute) {}

  onTogglePrev(): void {
    this.pageNumber = this.pageNumber - 1;
    this.selectPage.emit(this.pageNumber);
  }

  onToggleNext(): void {
    if (this.items.length === 8) {
      this.pageNumber = this.pageNumber + 1;
    }
    this.selectPage.emit(this.pageNumber);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroyStream))
      .subscribe(() => {
        this.pageNumber = 0;
        this.selectPage.emit(0);
      });
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
