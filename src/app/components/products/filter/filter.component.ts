import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['filter.component.css'],
})
export class FilterComponent {
  selectedColor = 'any';

  constructor() {}

  colorTask: Task = {
    name: '',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'color', completed: false, color: 'accent' },
      { name: 'color', completed: false, color: 'accent' },
      { name: 'color', completed: false, color: 'accent' },
    ],
  };

  sizeTask: Task = {
    name: '',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'XL', completed: false, color: 'accent' },
      { name: 'L', completed: false, color: 'accent' },
      { name: 'M', completed: false, color: 'accent' },
      { name: 'S', completed: false, color: 'accent' },
      { name: 'XS', completed: false, color: 'accent' },
    ],
  };

  priceTask: Task = {
    name: '',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: '1500+ UAN', completed: false, color: 'accent' },
      { name: '1000 - 1499 UAN', completed: false, color: 'accent' },
      { name: '700 - 999 UAN', completed: false, color: 'accent' },
      { name: '300 - 699 UAN', completed: false, color: 'accent' },
      { name: '99 - 299 UAN', completed: false, color: 'accent' },
    ],
  };
}
