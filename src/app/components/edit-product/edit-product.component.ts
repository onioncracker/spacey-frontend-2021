import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditProductService } from '../../store/service/edit-product/edit-product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CatergoryMaterialsAdd } from '../../store/models/catergoryMaterialsAdd';
import { SizesAdd } from '../../store/models/sizesAdd';
import { AddProductService } from '../../store/service/add-product/add-product.service';
import {EditProduct} from "../../store/models/editProduct";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product!: EditProduct;
  editProductForm: FormGroup;
  materialsList!: CatergoryMaterialsAdd[];
  categories!: CatergoryMaterialsAdd[];
  colors!: CatergoryMaterialsAdd[];
  sizesAmount!: SizesAdd[];

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService,
    private formBuilder: FormBuilder,
    private editProductService: EditProductService
  ) {
    this.editProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      createDate: ['', [Validators.required]],
      productSex: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isAvailable: ['', [Validators.required]],
      category: ['', [Validators.required]],
      color: ['', [Validators.required]],
      materials: ['', [Validators.required]],
      sizes: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.updateProduct();
  }

  getProduct(): void {
    this.editProductService.getProductById(61).pipe()
      .subscribe((product: EditProduct) => {
        this.product = product;
      });
  }

  updateProduct() {

  }


  // public editProduct(): void {
  //   this.product = {
  //     id: this.editProductForm.get('id')?.value,
  //     name: this.editProductForm.get('name')?.value,
  //     createDate: this.editProductForm.get('createDate')?.value,
  //     productSex: this.editProductForm.get('productSex')?.value,
  //     price: this.editProductForm.get('price')?.value,
  //     discount: this.editProductForm.get('discount')?.value,
  //     photo: this.editProductForm.get('photo')?.value,
  //     description: this.editProductForm.get('description')?.value,
  //     isAvailable: this.editProductForm.get('isAvailable')?.value,
  //     category: this.editProductForm.get('category')?.value,
  //     color: this.editProductForm.get('color')?.value,
  //     materials: this.editProductForm.get('materials')?.value,
  //     sizes: this.sizesAmount,
  //   }
  //   this.editProductForm.controls.id.disable();
  //   this.editProductForm.controls.name.disable();
  //   this.editProductForm.controls.createDate.disable();
  //   this.editProductForm.controls.productSex.disable();
  //   this.editProductForm.controls.price.disable();
  //   this.editProductForm.controls.discount.disable();
  //   this.editProductForm.controls.photo.disable();
  //   this.editProductForm.controls.description.disable();
  //   this.editProductForm.controls.isAvailable.disable();
  //   this.editProductForm.controls.category.disable();
  //   this.editProductForm.controls.color.disable();
  //   this.editProductForm.controls.materials.disable();
  //   this.editProductForm.controls.sizes.disable();
  //
  //   this.editProductService.getProductById(this.product).subscribe((response) =>{
  //     const data = response.body;
  //   })
  // }

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
      .subscribe((sizesAmount: SizesAdd[]) => {
        this.sizesAmount = sizesAmount;
      });
  }

  onTrackBy(index: number) {
    return index;
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
    this.getProduct();
  }
}
