import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EditProductService} from '../../store/service/edit-product/edit-product.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

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

  title = 'Edit product';

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
