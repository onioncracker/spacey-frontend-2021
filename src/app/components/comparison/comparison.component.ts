import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompareService } from '../../store/service/comparison/compare.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent {
  title = 'Comparison';
  products = [{}, {}, {}];

  constructor(
    private route: ActivatedRoute,
    private comparisonService: CompareService
  ) {}
}
