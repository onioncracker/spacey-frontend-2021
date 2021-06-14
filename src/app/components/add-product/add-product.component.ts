import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../../store/service/add-product/add-product.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddProduct} from "../../store/models/addProduct";
import {CatergoryMaterialsAdd} from "../../store/models/catergoryMaterialsAdd";
import {SizesAdd} from "../../store/models/sizesAdd";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit{
  product!: AddProduct;
  addProductForm: FormGroup;
  materialsList!: CatergoryMaterialsAdd [];
  categories!: CatergoryMaterialsAdd [];
  colors!: CatergoryMaterialsAdd [];
  sizesAmount!: SizesAdd [];
  // photo = 'jhbg,jh';
  // amount = 39;

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService,
    private formBuilder: FormBuilder
  ) {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      productSex: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isAvailable: ['', [Validators.required]],
      isOnAuction: ['', [Validators.required]],
      category: ['', [Validators.required]],
      color: ['', [Validators.required]],
      materials: ['', [Validators.required]],
      sizes: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.addProduct();
  }

  public addProduct(): void {
    this.product = {
      name: this.addProductForm.get('name')?.value,
      amount: this.addProductForm.get('amount')?.value,
      productSex: this.addProductForm.get('productSex')?.value,
      price: this.addProductForm.get('price')?.value,
      discount: this.addProductForm.get('discount')?.value,
      photo: this.addProductForm.get('photo')?.value,
      description: this.addProductForm.get('description')?.value,
      isAvailable: this.addProductForm.get('isAvailable')?.value,
      isOnAuction: this.addProductForm.get('isOnAuction')?.value,
      category: this.addProductForm.get('category')?.value,
      color: this.addProductForm.get('color')?.value,
      materials: this.addProductForm.get('materials')?.value,
      sizes: this.addProductForm.get('sizes')?.value,
    };
    this.addProductForm.controls.name.disable();
    this.addProductForm.controls.amount.disable();
    this.addProductForm.controls.productSex.disable();
    this.addProductForm.controls.price.disable();
    this.addProductForm.controls.discount.disable();
    this.addProductForm.controls.photo.disable();
    this.addProductForm.controls.description.disable();
    this.addProductForm.controls.isAvailable.disable();
    this.addProductForm.controls.isOnAuction.disable();
    this.addProductForm.controls.category.disable();
    this.addProductForm.controls.color.disable();
    this.addProductForm.controls.materials.disable();
    this.addProductForm.controls.sizes.disable();

    this.addProductService
      .addNewProduct(this.product)
      .subscribe(
        (response) => {
        const data = response.body;
      }
    )
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
      .subscribe((sizesAmount: SizesAdd[]) =>{
        this.sizesAmount = sizesAmount;
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

  size = new SizesAdd();

  saverange (size: any): any {

    // this.size.quantity = value;
    // console.log(value);
     console.log(size);
  }

  ngOnInit() {
    this.allMaterials();
    this.allColors();
    this.allSizes();
    this.allCategory();
  }
}
