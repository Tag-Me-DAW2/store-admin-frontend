import { ProductMaterial } from '../ProductMaterial';

export interface ProductInsertRequest {
  name: string;
  description: string;
  basePrice: number;
  discountPercentage: number;
  image: string;
  imageName: string;
  categoryId: number;
  material: ProductMaterial;
}
