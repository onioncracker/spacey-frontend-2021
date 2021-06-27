import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductModel } from '../../store/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() item!: ProductModel;

  getPill() {
    return this.item.discount;
  }
}
