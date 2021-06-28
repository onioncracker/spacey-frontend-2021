import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['pill.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {
  @Input() pill!: number;
}
