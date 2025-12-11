import { CategoryResponse } from './category-response';

export interface ProductDetailResponse {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  discountPercentage: number;
  finalPrice: number;
  image: string;
  category: CategoryResponse;
}
