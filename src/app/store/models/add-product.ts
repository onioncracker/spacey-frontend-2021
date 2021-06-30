import { CategoryColorMaterialsModel } from './category-color-materials.model';
import { Sizes } from './sizes';

export class AddProduct {
  name!: string;
  productSex!: string;
  price!: number;
  discount!: number;
  photo!: string;
  description!: string;
  isAvailable!: boolean;
  category!: CategoryColorMaterialsModel;
  color!: CategoryColorMaterialsModel;
  materials!: [CategoryColorMaterialsModel];
  sizes!: Sizes[];
}
