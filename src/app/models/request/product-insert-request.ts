export interface ProductInsertRequest {
  name: string;
  description: string;
  basePrice: number;
  discountPercentage: number;
  image: string;
  categoryId: number;
}
