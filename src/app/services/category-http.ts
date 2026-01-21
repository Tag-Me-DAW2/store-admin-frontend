import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryRequest } from '../models/request/category-request';
import { CategoryResponse } from '../models/response/category-response';
import { map, Observable } from 'rxjs';
import { PageModel } from '../models/PageModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryHttp {
  httpClient = inject(HttpClient);
  apiUrl = 'http://store-tagme.preproducciondaw.cip.fpmislata.com/categories';
  apiUrlAdmin = 'http://store-tagme.preproducciondaw.cip.fpmislata.com/admin/categories';

  getCategories(pageNumber: number, pageSize: number): Observable<PageModel<CategoryResponse>> {
    return this.httpClient.get<PageModel<CategoryResponse>>(
      `${this.apiUrl}?page=${pageNumber}&size=${pageSize}`,
    );
  }

  getCategoryById(categoryId: number): Observable<CategoryResponse> {
    return this.httpClient.get<CategoryResponse>(`${this.apiUrl}/${categoryId}`);
  }

  createCategory(category: CategoryRequest): Observable<CategoryResponse> {
    return this.httpClient.post<CategoryResponse>(this.apiUrlAdmin, category);
  }

  updateCategory(categoryId: number, category: CategoryRequest): Observable<CategoryResponse> {
    return this.httpClient.put<CategoryResponse>(`${this.apiUrlAdmin}/${categoryId}`, category);
  }

  deleteCategoryById(categoryId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrlAdmin}/${categoryId}`);
  }

  getCategoryCount(): Observable<number> {
    return this.httpClient
      .get<PageModel<CategoryResponse>>(`${this.apiUrl}`)
      .pipe(map((response) => response.totalElements));
  }
}
