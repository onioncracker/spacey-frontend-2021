import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AddProductService} from '../../store/service/add-product/add-product.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  materialCtrl = new FormControl();
  filteredMaterials: Observable<string[]>;
  materials: string[] = [];
  allMaterials: string[] = ['Cotton', 'Synthetics', 'Viscose', 'Silk'];
  checked = false;

  title = 'Add product';

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService
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
