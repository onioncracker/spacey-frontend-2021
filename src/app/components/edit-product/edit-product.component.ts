import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditProductService } from '../../store/service/edit-product/edit-product.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  materialCtrl = new FormControl();
  filteredMaterials: Observable<string[]>;
  materials: string[] = [];
  allMaterials: string[] = ['Cotton', 'Synthetics', 'Viscose', 'Silk'];
  checked = false;

  toppings = new FormControl();
  toppingList: string[] = ['Cotton', 'Synthetics', 'Viscose', 'Silk', 'Wool', 'Polyester'];

  selectedValue!: string;

  categories: Category[] = [
    {value1: 'T-shorts-0', viewValue1: 'T-shorts'},
    {value1: 'Jeans-1', viewValue1: 'Jeans'},
    {value1: 'Shorts-2', viewValue1: 'Shorts'}
  ];

  sexes: Sex[] = [
    {value2: 'MEN', viewValue2: 'MEN'},
    {value2: 'WOMEN', viewValue2: 'WOMEN'},
  ];

  colors: Color[] = [
    {value3: 'Red', viewValue3: 'Red'},
    {value3: 'Pink', viewValue3: 'Pink'},
    {value3: 'Brown', viewValue3: 'Brown'}
  ];

  constructor(
    private route: ActivatedRoute,
    private EditProductService: EditProductService
  ) {
    this.filteredMaterials = this.materialCtrl.valueChanges.pipe(
      startWith(null),
      map((material: string | null) =>
        material ? this._filter(material) : this.allMaterials.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.materials.push(value);
    }

    event.chipInput!.clear();

    this.materialCtrl.setValue(null);
  }

  remove(material: string): void {
    const index = this.materials.indexOf(material);

    if (index >= 0) {
      this.materials.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.materials.push(event.option.viewValue);
    this.materialCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMaterials.filter(
      (material) => material.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
