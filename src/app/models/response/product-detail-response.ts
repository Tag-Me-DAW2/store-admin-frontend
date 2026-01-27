import { ProductMaterial } from '../ProductMaterial';
import { CategoryResponse } from './category-response';

export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  discountPercentage: number;
  price: number;
  image: string;
  imageName: string;
  category: CategoryResponse;
  material: ProductMaterial;
}
