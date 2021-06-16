import { CatergoryMaterialsAdd } from './catergoryMaterialsAdd';
import { SizesAdd } from './sizesAdd';

export class EditProduct {
  id!: number;
  name!: string;
  amount!: number;
  createDate!: string;
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
  sizes!: SizesAdd [];
}
