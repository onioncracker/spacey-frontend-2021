import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../../store/service/add-product/add-product.service';
import { FormControl } from '@angular/forms';

interface Category {
  value1: string;
  viewValue1: string;
}
interface Sex {
  value2: string;
  viewValue2: string;
}
interface Color {
  value3: string;
  viewValue3: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  toppings = new FormControl();
  toppingList: string[] = [
    'Cotton',
    'Synthetics',
    'Viscose',
    'Silk',
    'Wool',
    'Polyester',
  ];

  selectedValue!: string;

  categories: Category[] = [
    { value1: 'T-shorts-0', viewValue1: 'T-shorts' },
    { value1: 'Jeans-1', viewValue1: 'Jeans' },
    { value1: 'Shorts-2', viewValue1: 'Shorts' },
  ];

  sexes: Sex[] = [
    { value2: 'MEN', viewValue2: 'MEN' },
    { value2: 'WOMEN', viewValue2: 'WOMEN' },
  ];

  colors: Color[] = [
    { value3: 'Red', viewValue3: 'Red' },
    { value3: 'Pink', viewValue3: 'Pink' },
    { value3: 'Brown', viewValue3: 'Brown' },
  ];

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService
  ) {}
}
