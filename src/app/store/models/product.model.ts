import { SizeModel } from './size.model';

export class ProductModel {
  id!: number;
  name!: string;
  sex!: string;
  price!: number;
  photo!: string;
  description!: string;
  discount!: number;
  availability!: boolean;
  color!: string;
  sizes!: SizeModel[];
  category!: string;
  materials!: string[];
}
