import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSummaryResponse } from '../models/response/product-summary-response';
import { HttpClient } from '@angular/common/http';
import { ProductInsertRequest } from '../models/request/product-insert-request';
import { ProductDetailResponse } from '../models/response/product-detail-response';
import { ProductUpdateRequest } from '../models/request/product-update-request';

@Injectable({
  providedIn: 'root',
})
export class ProductHttp {
  httpClient = inject(HttpClient);
  apiUrl = 'http://localhost:8080/products';

  getProducts(): Observable<ProductSummaryResponse[]> {
    return this.httpClient.get<ProductSummaryResponse[]>(this.apiUrl);
  }

  getProductById(productId: string): Observable<ProductDetailResponse> {
    return this.httpClient.get<ProductDetailResponse>(`${this.apiUrl}/${productId}`);
  }

  createProduct(product: ProductInsertRequest): Observable<ProductDetailResponse> {
    return this.httpClient.post<ProductDetailResponse>(this.apiUrl, product);
  }

  updateProduct(productId: string, product: ProductUpdateRequest): Observable<ProductDetailResponse> {
    return this.httpClient.put<ProductDetailResponse>(`${this.apiUrl}/${productId}`, product);
  }

  deleteProductById(productId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
