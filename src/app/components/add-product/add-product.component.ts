import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../../store/service/add-product/add-product.service';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { CategoryColorMaterialsModel } from '../../store/models/category-color-materials.model';
import { Sizes } from '../../store/models/sizes';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { AddProduct } from '../../store/models/add-product';
import { TokenStorageService } from '../../store/service/auth/token-storage.service';
import { ErrorPageService } from '../../store/service/error/error-page.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  title = 'Add product';
  product!: AddProduct;
  addProductForm: FormGroup;
  materialsList!: CategoryColorMaterialsModel[];
  categories!: CategoryColorMaterialsModel[];
  colors!: CategoryColorMaterialsModel[];
  sizesAmount!: Sizes[];
  photoFile!: File;

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private tokenStorageService: TokenStorageService,
    private errorPageService: ErrorPageService
  ) {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      productSex: ['', [Validators.required]],
      price: ['', [Validators.min(0), Validators.required]],
      discount: [0, [Validators.min(0), Validators.required]],
      description: ['', [Validators.required]],
      isAvailable: [true, [Validators.required]],
      category: ['', [Validators.required]],
      color: ['', [Validators.required]],
      materials: ['', [Validators.required]],
      sizes: [0, [Validators.min(0), Validators.required]],
    });
  }

  private isProductManagerRole(): boolean {
    let userRole = this.tokenStorageService.getRole();
    return userRole === 'PRODUCT_MANAGER';
  }

  onSubmit(addProductForm: any, productForm: FormGroupDirective) {
    this.addProduct();
    productForm.resetForm();
    this.dialogService.openMessage('Product has been added', 'Close');
    console.log(this.photoFile);
  }

  public addProduct(): void {
    this.product = {
      name: this.addProductForm.get('name')?.value,
      productSex: this.addProductForm.get('productSex')?.value,
      price: this.addProductForm.get('price')?.value,
      discount: this.addProductForm.get('discount')?.value,
      photo: this.addProductForm.get('photo')?.value,
      description: this.addProductForm.get('description')?.value,
      isAvailable: this.addProductForm.get('isAvailable')?.value,
      category: this.addProductForm.get('category')?.value,
      color: this.addProductForm.get('color')?.value,
      materials: this.addProductForm.get('materials')?.value,
      sizes: this.sizesAmount,
    };
    this.addProductForm.controls.name.enable();
    this.addProductForm.controls.productSex.enable();
    this.addProductForm.controls.price.enable();
    this.addProductForm.controls.discount.enable();
    this.addProductForm.controls.photo.enable();
    this.addProductForm.controls.description.enable();
    this.addProductForm.controls.isAvailable.enable();
    this.addProductForm.controls.category.enable();
    this.addProductForm.controls.color.enable();
    this.addProductForm.controls.materials.enable();
    this.addProductForm.controls.sizes.enable();

    this.addProductService.addNewProduct(this.product).subscribe((response) => {
      const data = response.body;
      console.log(data);
      this.addProductService.uploadImage(this.photoFile, data);
      console.log(this.photoFile, data);
    });
  }

  allMaterials() {
    this.addProductService
      .getAllMaterials()
      .pipe()
      .subscribe((materialsList: CategoryColorMaterialsModel[]) => {
        this.materialsList = materialsList;
      });
  }

  allColors() {
    this.addProductService
      .getAllColors()
      .pipe()
      .subscribe((colors: CategoryColorMaterialsModel[]) => {
        this.colors = colors;
      });
  }

  allSizes() {
    this.addProductService
      .getAllSizes()
      .pipe()
      .subscribe((sizesAmount: Sizes[]) => {
        this.sizesAmount = sizesAmount;
      });
  }

  allCategory() {
    this.addProductService
      .getAllCategories()
      .pipe()
      .subscribe((categories: CategoryColorMaterialsModel[]) => {
        this.categories = categories;
      });
  }

  onTrackBy(index: number) {
    return index;
  }

  getPhoto(event) {
    this.photoFile = event;
  }

  ngOnInit() {
    this.allMaterials();
    this.allColors();
    this.allSizes();
    this.allCategory();
    if (!this.isProductManagerRole()) {
      this.errorPageService.openErrorPage('Access is denied');
    }
  }
}
