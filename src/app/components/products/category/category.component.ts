import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['category.component.css'],
})
export class CategoryComponent {
  typesOfTops: string[] = [
    'Blazers',
    'Sweaters',
    'Blouses',
    'T-shirts',
    'Hoodies',
  ];
  typesOfBottoms: string[] = ['Jeans', 'Pants', 'Skirts', 'Shorts'];
  typesOfAccessories: string[] = ['Bags', 'Belts', 'Socks', 'Jewelry'];

  constructor() {}
}
