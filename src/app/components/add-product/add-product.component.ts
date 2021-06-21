import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddProductService } from '../../store/service/add-product/add-product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AddProduct } from '../../store/models/addProduct';
import { CatergoryMaterialsAdd } from '../../store/models/catergoryMaterialsAdd';
import { SizesAdd } from '../../store/models/sizesAdd';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product!: AddProduct;
  addProductForm: FormGroup;
  materialsList!: CatergoryMaterialsAdd[];
  categories!: CatergoryMaterialsAdd[];
  colors!: CatergoryMaterialsAdd[];
  sizesAmount!: SizesAdd[];
  selectedFile!: ImageSnippet;

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService,
    private formBuilder: FormBuilder
  ) {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      productSex: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: [0, [Validators.required]],
      photo: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isAvailable: [true, [Validators.required]],
      category: ['', [Validators.required]],
      color: ['', [Validators.required]],
      materials: ['', [Validators.required]],
      sizes: [0, [Validators.required]],
    });
  }

  onSubmit() {
    this.addProduct();
    // this.addProductForm.reset();
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
    this.addProductForm.controls.name.disable();
    this.addProductForm.controls.productSex.disable();
    this.addProductForm.controls.price.disable();
    this.addProductForm.controls.discount.disable();
    this.addProductForm.controls.photo.disable();
    this.addProductForm.controls.description.disable();
    this.addProductForm.controls.isAvailable.disable();
    this.addProductForm.controls.category.disable();
    this.addProductForm.controls.color.disable();
    this.addProductForm.controls.materials.disable();
    this.addProductForm.controls.sizes.disable();

    this.addProductService.addNewProduct(this.product).subscribe((response) => {
      const data = response.body;
      console.log(data);
      this.addProductService.uploadImage(this.selectedFile.file, data);
      console.log(this.selectedFile, data);
    });
  }

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

  allCategory() {
    this.addProductService
      .getAllCategory()
      .pipe()
      .subscribe((categories: CatergoryMaterialsAdd[]) => {
        this.categories = categories;
      });
  }

  onTrackBy(index: number) {
    return index;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.allMaterials();
    this.allColors();
    this.allSizes();
    this.allCategory();
  }
}
