import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditProductService } from '../../store/service/edit-product/edit-product.service';
import { FormBuilder } from '@angular/forms';
import { AddProduct } from '../../store/models/addProduct';
import { CatergoryMaterialsAdd } from '../../store/models/catergoryMaterialsAdd';
import { SizesAdd } from '../../store/models/sizesAdd';
import { AddProductService } from '../../store/service/add-product/add-product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product!: AddProduct;
  materialsList!: CatergoryMaterialsAdd[];
  categories!: CatergoryMaterialsAdd[];
  colors!: CatergoryMaterialsAdd[];
  sizes!: SizesAdd[];
  photo = 'jhbg,jh';
  amount = 39;

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService,
    private formBuilder: FormBuilder,
    private editProductService: EditProductService
  ) {}

  allMaterials() {
    this.addProductService
      .getAllMaterials()
      .pipe()
      .subscribe((materialsList: CatergoryMaterialsAdd[]) => {
        this.materialsList = materialsList;
      });
  }

  allColors() {
    this.addProductService
      .getAllColors()
      .pipe()
      .subscribe((colors: CatergoryMaterialsAdd[]) => {
        this.colors = colors;
      });
  }

  allSizes() {
    this.addProductService
      .getAllSizes()
      .pipe()
      .subscribe((sizes: SizesAdd[]) => {
        this.sizes = sizes;
        console.log();
      });
  }

  allCategory() {
    this.addProductService
      .getAllCategory()
      .pipe()
      .subscribe((categories: CatergoryMaterialsAdd[]) => {
        this.categories = categories;
      });
  }

  ngOnInit() {
    this.allMaterials();
    this.allColors();
    this.allSizes();
    this.allCategory();
  }
}
