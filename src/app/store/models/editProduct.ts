export class EditProduct {
  id!: number;
  name!: string;
  price!: number;
  discount!: number;
  description!: string;
  productSex!: string;
  photo!: string;
  isAvailable!: boolean;
  category!: {
    id: number;
    name: string;
  };
  materials!: {
    id: number;
    name: string;
  };
  productDetails!: {
    sizeProduct: string;
    color: string;
    amount: number;
  };
}
