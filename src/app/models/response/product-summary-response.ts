import { CategoryResponse } from './category-response';

export interface ProductSummaryResponse {
  id: number;
  name: string;
  discountPercentage: number;
  price: number;
  image: string;
  category: CategoryResponse;
  material: string;
}
