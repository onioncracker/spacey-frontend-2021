import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../../store/service/add-product/add-product.service';
import { FormControl } from '@angular/forms';

interface Category {}
interface Sex {}
interface Color {}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  toppings = new FormControl();
  toppingList: string[] = [];

  selectedValue!: string;

  categories: Category[] = [];
  sexes: Sex[] = [];
  colors: Color[] = [];

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService
  ) {}
}
