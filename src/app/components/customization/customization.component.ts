import { Component, OnInit } from '@angular/core';
import { AddProductService } from '../../store/service/add-product/add-product.service';
import { CategoryColorMaterialsModel } from '../../store/models/category-color-materials.model';
import { DialogService } from '../../store/service/dialog/dialog.service';
import { CustomizationService } from '../../store/service/customization/customization.service';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css'],
})
export class CustomizationComponent implements OnInit {
  colors: CategoryColorMaterialsModel[] = [];
  categories: CategoryColorMaterialsModel[] = [];
  materials: CategoryColorMaterialsModel[] = [];
  sizes: CategoryColorMaterialsModel[] = [];

  selectedColor: CategoryColorMaterialsModel = new CategoryColorMaterialsModel(
    0,
    'test'
  );
  selectedCategory: CategoryColorMaterialsModel =
    new CategoryColorMaterialsModel(0, 'test');
  selectedMaterial: CategoryColorMaterialsModel =
    new CategoryColorMaterialsModel(0, 'test');
  selectedSize: CategoryColorMaterialsModel = new CategoryColorMaterialsModel(
    0,
    'test'
  );

  constructor(
    private addProductService: AddProductService,
    private dialogService: DialogService,
    private customizationService: CustomizationService
  ) {}

  addOptions = {
    title: 'Add custom?',
    message: 'Custom will be added.',
    cancelText: 'CANCEL',
    confirmText: 'ADD',
  };

  saveOptions = {
    title: 'Save custom?',
    message: 'Custom will be saved.',
    cancelText: 'CANCEL',
    confirmText: 'SAVE',
  };

  ngOnInit(): void {
    this.allColors();
    this.allCategories();
    this.allMaterials();
    this.allSizes();
  }

  allColors(): void {
    this.addProductService
      .getAllColors()
      .subscribe((colors: CategoryColorMaterialsModel[]) => {
        this.colors = colors;
        this.selectedColor = colors[0];
      });
  }

  allCategories(): void {
    this.addProductService
      .getAllCategories()
      .subscribe((categories: CategoryColorMaterialsModel[]) => {
        this.categories = categories;
        this.selectedCategory = categories[0];
      });
  }

  allMaterials(): void {
    this.addProductService
      .getAllMaterials()
      .subscribe((materials: CategoryColorMaterialsModel[]) => {
        this.materials = materials;
        this.selectedMaterial = materials[0];
      });
  }

  allSizes(): void {
    this.addProductService
      .getAllSizes()
      .subscribe((sizes: CategoryColorMaterialsModel[]) => {
        this.sizes = sizes;
        this.selectedSize = sizes[0];
      });
  }

  saveColor(): void {
    this.dialogService.openConfirm(this.saveOptions);
    this.dialogService.confirmed().subscribe((confirm) => {
      if (confirm) {
        this.customizationService
          .saveColor(this.selectedColor)
          .subscribe(() => {
            this.dialogService.openMessage('Changes has been saved', 'Close');
            this.allColors();
          });
      }
    });
  }

  saveCategory(): void {
    this.dialogService.openConfirm(this.saveOptions);
    this.dialogService.confirmed().subscribe((confirm) => {
      if (confirm) {
        this.customizationService
          .saveCategory(this.selectedCategory)
          .subscribe(() => {
            this.dialogService.openMessage('Changes has been saved', 'Close');
            this.allCategories();
          });
      }
    });
  }

  saveMaterial(): void {
    this.dialogService.openConfirm(this.saveOptions);
    this.dialogService.confirmed().subscribe((confirm) => {
      if (confirm) {
        this.customizationService
          .saveMaterial(this.selectedMaterial)
          .subscribe(() => {
            this.dialogService.openMessage('Changes has been saved', 'Close');
            this.allMaterials();
          });
      }
    });
  }

  saveSize(): void {
    this.dialogService.openConfirm(this.saveOptions);
    this.dialogService.confirmed().subscribe((confirm) => {
      if (confirm) {
        this.customizationService.saveSize(this.selectedSize).subscribe(() => {
          this.dialogService.openMessage('Changes has been saved', 'Close');
          this.allSizes();
        });
      }
    });
  }

  addColor(): void {
    this.dialogService.openInput(this.addOptions);
    this.dialogService.getInputMessage().subscribe((input: string) => {
      if (input.length === 0) {
        this.dialogService.openMessage('Input value and try again', 'Close');
      }
      if (input) {
        this.customizationService
          .addNewColor(new CategoryColorMaterialsModel(0, input))
          .subscribe(() => {
            this.dialogService.openMessage('Custom has been added', 'Close');
            this.allColors();
          });
      }
    });
  }

  addCategory(): void {
    this.dialogService.openInput(this.addOptions);
    this.dialogService.getInputMessage().subscribe((input: string) => {
      if (input.length === 0) {
        this.dialogService.openMessage('Input value and try again', 'Close');
      }
      if (input) {
        this.customizationService
          .addNewCategory(new CategoryColorMaterialsModel(0, input))
          .subscribe(() => {
            this.dialogService.openMessage('Custom has been added', 'Close');
            this.allCategories();
          });
      }
    });
  }

  addMaterial(): void {
    this.dialogService.openInput(this.addOptions);
    this.dialogService.getInputMessage().subscribe((input: string) => {
      if (input.length === 0) {
        this.dialogService.openMessage('Input value and try again', 'Close');
      }
      if (input) {
        this.customizationService
          .addNewMaterial(new CategoryColorMaterialsModel(0, input))
          .subscribe(() => {
            this.dialogService.openMessage('Custom has been added', 'Close');
            this.allMaterials();
          });
      }
    });
  }

  addSize(): void {
    this.dialogService.openInput(this.addOptions);
    this.dialogService.getInputMessage().subscribe((input: string) => {
      if (input.length === 0) {
        this.dialogService.openMessage('Input value and try again', 'Close');
      }
      if (input) {
        this.customizationService
          .addNewSize(new CategoryColorMaterialsModel(0, input))
          .subscribe(() => {
            this.dialogService.openMessage('Custom has been added', 'Close');
            this.allSizes();
          });
      }
    });
  }
}
