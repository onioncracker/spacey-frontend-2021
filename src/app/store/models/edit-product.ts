import { CategoryColorMaterialsModel } from './category-color-materials.model';
import { Sizes } from './sizes';

export class EditProduct {
  id!: number;
  name!: string;
  productSex!: string;
  price!: number;
  discount!: number;
  photo!: string;
  description!: string;
  isAvailable!: boolean;
  category!: CategoryColorMaterialsModel;
  color!: CategoryColorMaterialsModel;
  materials!: CategoryColorMaterialsModel[];
  sizes!: Sizes[];
  constructor(
    id: number,
    name: string,
    category: CategoryColorMaterialsModel,
    color: CategoryColorMaterialsModel,
    materials: CategoryColorMaterialsModel[],
    sex: string,
    price: number,
    discount: number,
    photo: string,
    description: string,
    isAvailable: boolean,
    sizes: Sizes[]
  ) {
    this.id = id;
    this.category = category;
    this.color = color;
    this.materials = materials;
    this.name = name;
    this.productSex = sex;
    this.price = price;
    this.discount = discount;
    this.photo = photo;
    this.description = description;
    this.isAvailable = isAvailable;
    this.sizes = sizes;
  }
}
