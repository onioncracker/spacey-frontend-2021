import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditProductService } from '../../store/service/edit-product/edit-product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryColorMaterials } from '../../store/models/category-color-materials';
import { Sizes } from '../../store/models/sizes';
import { AddProductService } from '../../store/service/add-product/add-product.service';
import { EditProduct } from '../../store/models/edit-product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product!: EditProduct;
  materialsList!: CategoryColorMaterials[];
  categories!: CategoryColorMaterials[];
  colors!: CategoryColorMaterials[];
  sizesAmount!: Sizes[];
  selectedCategory!: number;

  constructor(
    private route: ActivatedRoute,
    private addProductService: AddProductService,
    private formBuilder: FormBuilder,
    private editProductService: EditProductService
  ) {}

  editProductForm = this.formBuilder.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
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

  onSubmit() {
    this.product = this.editProductForm.value;
    this.product.sizes = this.sizesAmount;
    console.log(this.product);
    this.updateProduct(this.product);
  }

  getProduct(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.editProductService
      .getProductById(id)
      .pipe()
      .subscribe((product: EditProduct) => {
        this.product = new EditProduct(
          product.id,
          product.name,
          product.category,
          product.color,
          product.materials,
          product.productSex,
          product.price,
          product.discount,
          product.photo,
          product.description,
          product.isAvailable,
          product.sizes
        );
        this.editProductForm.setValue(this.product);
        this.sizesAmount = product.sizes;
      });
  }

  updateProduct(product: EditProduct) {
    this.editProductService.updateProductById(product).subscribe();
  }

  deleteProduct(id: number) {
    this.editProductService.deleteProductById(id).subscribe();
  }

  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  allMaterials() {
    this.addProductService
      .getAllMaterials()
      .pipe()
      .subscribe((materialsList: CategoryColorMaterials[]) => {
        this.materialsList = materialsList;
      });
  }

  allColors() {
    this.addProductService
      .getAllColors()
      .pipe()
      .subscribe((colors: CategoryColorMaterials[]) => {
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

  onTrackBy(index: number) {
    return index;
  }

  allCategory() {
    this.addProductService
      .getAllCategory()
      .pipe()
      .subscribe((categories: CategoryColorMaterials[]) => {
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
