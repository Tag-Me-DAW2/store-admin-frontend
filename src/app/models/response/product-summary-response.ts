import { CategoryResponse } from './category-response';

export interface ProductSummaryResponse {
  id: number;
  name: string;
  category: CategoryResponse;
}
