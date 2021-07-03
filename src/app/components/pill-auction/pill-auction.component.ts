import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pill-auction',
  templateUrl: './pill-auction.component.html',
  styleUrls: ['pill-auction.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillAuctionComponent {
  @Input() pill!: number;
}
