import {SizesComparison} from "./sizesComparison";

export class Comparison {
  id!: number;
  name!: string;
  price!: number;
  discount!: number;
  description!: string;
  sex!: string;
  photo!: string;
  availability!: boolean;
  materials!: string[];
  sizes!: [SizesComparison];
  color!: string;
  amount!: number;
  category!: string;
}
