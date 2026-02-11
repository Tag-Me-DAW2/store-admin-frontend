import { ProductSummaryResponse } from '../product-summary-response';

export interface OrderItemResponse {
  id: number;
  product: ProductSummaryResponse | null;
  productName: string;
  productImage: string;
  productImageName: string;
  quantity: number;
  basePrice: number;
  discountPercentage: number;
  total: number;
}
