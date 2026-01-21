import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSummaryResponse } from '../models/response/product-summary-response';
import { HttpClient } from '@angular/common/http';
import { ProductInsertRequest } from '../models/request/product-insert-request';
import { ProductDetailResponse } from '../models/response/product-detail-response';
import { ProductUpdateRequest } from '../models/request/product-update-request';
import { PageModel } from '../models/PageModel';

@Injectable({
  providedIn: 'root',
})
export class ProductHttp {
  httpClient = inject(HttpClient);
  apiUrl = 'http://store-back-tagme.preproducciondaw.cip.fpmislata.com/products';
  apiUrlAdmin = 'http://store-back-tagme.preproducciondaw.cip.fpmislata.com/admin/products';

  getProducts(pageNumber: number, pageSize: number): Observable<PageModel<ProductSummaryResponse>> {
    return this.httpClient.get<PageModel<ProductSummaryResponse>>(
      `${this.apiUrl}?page=${pageNumber}&size=${pageSize}`,
    );
  }

  getProductById(productId: number): Observable<ProductDetailResponse> {
    return this.httpClient.get<ProductDetailResponse>(`${this.apiUrl}/${productId}`);
  }

  createProduct(product: ProductInsertRequest): Observable<ProductDetailResponse> {
    return this.httpClient.post<ProductDetailResponse>(this.apiUrlAdmin, product);
  }

  updateProduct(
    productId: number,
    product: ProductUpdateRequest,
  ): Observable<ProductDetailResponse> {
    return this.httpClient.put<ProductDetailResponse>(`${this.apiUrlAdmin}/${productId}`, product);
  }

  deleteProductById(productId: number): Observable<void> {
    console.log('Deleting product with ID:', productId);
    return this.httpClient.delete<void>(`${this.apiUrlAdmin}/${productId}`);
  }

  getProductCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/total`);
  }
}
