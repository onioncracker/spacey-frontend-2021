import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuctionModel } from '../../store/models/auction.model';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['auction.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuctionComponent {
  @Input() item!: AuctionModel;

  getPill() {
    return this.item.amount;
  }
}
