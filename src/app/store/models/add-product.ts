import { CategoryColorMaterials } from './category-color-materials';
import { Sizes } from './sizes';

export class AddProduct {
  name!: string;
  productSex!: string;
  price!: number;
  discount!: number;
  photo!: string;
  description!: string;
  isAvailable!: boolean;
  category!: CategoryColorMaterials;
  color!: CategoryColorMaterials;
  materials!: [CategoryColorMaterials];
  sizes!: Sizes[];
}
