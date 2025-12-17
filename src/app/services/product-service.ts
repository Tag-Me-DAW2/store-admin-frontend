import { inject, Injectable } from '@angular/core';
import { ProductHttp } from './product-http';
import { Observable } from 'rxjs';
import { ProductSummaryResponse } from '../models/response/product-summary-response';
import { ProductDetailResponse } from '../models/response/product-detail-response';
import { ProductInsertRequest } from '../models/request/product-insert-request';
import { ProductUpdateRequest } from '../models/request/product-update-request';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productHttp = inject(ProductHttp);

  getProducts(): Observable<ProductSummaryResponse[]> {
    return this.productHttp.getProducts();
  }

  getProductById(productId: string): Observable<ProductDetailResponse> {
    return this.productHttp.getProductById(productId);
  }

  createProduct(product: ProductInsertRequest): Observable<ProductDetailResponse> {
    return this.productHttp.createProduct(product);
  }

  updateProduct(productId: string, product: ProductUpdateRequest): Observable<ProductDetailResponse> {
    return this.productHttp.updateProduct(productId, product);
  }

  deleteProductById(productId: string): Observable<void> {
    return this.productHttp.deleteProductById(productId);
  }
}
