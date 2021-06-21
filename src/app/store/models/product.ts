import {SizesComparison} from "./sizesComparison";

export class Product {
  id!: number;
  name!: string;
  sex!: string;
  price!: number;
  photo!: string;
  description!: string;
  discount!: number;
  availability!: boolean;
  color!: string;
  sizes!: SizesComparison[];
  category!: string;
  materials!: string[];
}
