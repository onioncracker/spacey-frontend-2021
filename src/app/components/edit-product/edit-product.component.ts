import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditProductService } from '../../store/service/edit-product/edit-product.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {AddProduct} from "../../store/models/addProduct";
import {CatergoryMaterialsAdd} from "../../store/models/catergoryMaterialsAdd";
import {SizesAdd} from "../../store/models/sizesAdd";
import {AddProductService} from "../../store/service/add-product/add-product.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  product!: AddProduct;
  //addProductForm: FormGroup;
  materialsList!: CatergoryMaterialsAdd [];
  categories!: CatergoryMaterialsAdd [];
  colors!: CatergoryMaterialsAdd [];
  sizes!: SizesAdd [];
  photo = 'jhbg,jh';
  amount = 39;

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService,
    private formBuilder: FormBuilder,
    private editProductService: EditProductService
  ) {

  }



  allMaterials() {
    this.addProductService
      .getAllMaterials()
      .pipe()
      .subscribe((materialsList:CatergoryMaterialsAdd[]) =>{
        this.materialsList = materialsList;
      })
  }

  allColors() {
    this.addProductService
      .getAllColors()
      .pipe()
      .subscribe((colors:CatergoryMaterialsAdd[]) =>{
        this.colors = colors;
      })
  }

  allSizes() {
    this.addProductService
      .getAllSizes()
      .pipe()
      .subscribe((sizes:SizesAdd[]) =>{
        this.sizes = sizes;
        console.log();
      })
  }

  allCategory() {
    this.addProductService
      .getAllCategory()
      .pipe()
      .subscribe((categories: CatergoryMaterialsAdd[]) =>{
        this.categories = categories;
      })
  }

  ngOnInit() {
    this.allMaterials();
    this.allColors();
    this.allSizes();
    this.allCategory();
  }
}
