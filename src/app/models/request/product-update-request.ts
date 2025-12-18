export interface ProductUpdateRequest {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  discountPercentage: number;
  image: string;
  imageName: string;
  categoryId: number;
}
