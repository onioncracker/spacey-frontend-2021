import {Component, OnInit} from '@angular/core';
import {AddProductService} from "../../store/service/add-product/add-product.service";
import {CategoryColorMaterialsModel} from "../../store/models/category-color-materials.model";
import {DialogService} from "../../store/service/dialog/dialog.service";
import {CustomizationService} from "../../store/service/customization/customization.service";

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css']
})
export class CustomizationComponent implements OnInit {

  colors: CategoryColorMaterialsModel[] = [];

  selectedColor: CategoryColorMaterialsModel = new CategoryColorMaterialsModel(0, "test");

  constructor(
    private addProductService: AddProductService,
    private dialogService: DialogService,
    private customizationService: CustomizationService,
  ) {
  }

  options = {
    title: 'Update status?',
    message: 'Status order will be changed.',
    cancelText: 'CANCEL',
    confirmText: 'YES',
  };

  ngOnInit(): void {
    this.allColors();
    console.log(this.colors)
  }

  allColors(): void {
    this.addProductService
      .getAllColors()
      .subscribe((colors: CategoryColorMaterialsModel[]) => {
        this.colors = colors;
        this.selectedColor = colors[0];
        console.log(this.selectedColor);
      });
  }

  save(): void {
    this.dialogService.openConfirm(this.options);
    this.dialogService.confirmed().subscribe((confirm) => {
      if (confirm) {
        this.customizationService.saveColor(this.selectedColor).subscribe((res) =>{
          alert(res);
        });
      }
    });
  }

  add(): void {
    this.dialogService.openInput(this.options);
    this.dialogService.getInputMessage().subscribe((input: string) => {
      if (input.length === 0) {
        this.dialogService.openMessage("Input value and try again", "Close");
      }
      if (input) {
        alert(input);
        this.customizationService.addNewColor(new CategoryColorMaterialsModel(0, input))
          .subscribe((error) => alert(error));
      }
    });
  }

  delete(): void {
    this.dialogService.openConfirm(this.options);
    this.dialogService.confirmed().subscribe((confirm) => {
        if (confirm) {
           this.customizationService.deleteColor(this.selectedColor.id).subscribe((res) => {
             alert(res);
           });
        }
    });

  }
}
