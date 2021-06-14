import {CatergoryMaterialsAdd} from "./catergoryMaterialsAdd";
import {SizesAdd} from "./sizesAdd";

export class AddProduct {
  name!: string;
  amount!: number;
  productSex!: string;
  price!: number;
  discount!: number;
  photo!: string;
  description!: string;
  isAvailable!: boolean;
  isOnAuction!: boolean;
  category!: CatergoryMaterialsAdd;
  color!: CatergoryMaterialsAdd;
  materials!: [CatergoryMaterialsAdd];
  sizes!: [SizesAdd];
}

