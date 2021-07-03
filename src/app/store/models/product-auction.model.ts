import { ColorModel } from './color.model';
import { MaterialModel } from './material.model';
import { CategoryModel } from './category.model';

export class ProductAuctionModel {
  id!: number;
  name!: string;
  productSex!: string;
  photo!: string;
  description!: string;
  productColor!: ColorModel;
  productCategory!: CategoryModel;
  materials!: MaterialModel[];
}
