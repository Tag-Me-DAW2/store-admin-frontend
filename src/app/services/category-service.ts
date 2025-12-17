import { inject, Injectable } from '@angular/core';
import { CategoryHttp } from './category-http';
import { CategoryRequest } from '../models/request/category-request';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryHttp = inject(CategoryHttp);

  getCategories() {
    return this.categoryHttp.getCategories();
  }

  getCategoryById(categoryId: number) {
    return this.categoryHttp.getCategoryById(categoryId);
  }

  createCategory(category: CategoryRequest) {
    return this.categoryHttp.createCategory(category);
  }

  updateCategory(categoryId: number, category: CategoryRequest) {
    return this.categoryHttp.updateCategory(categoryId, category);
  }

  deleteCategoryById(categoryId: number) {
    return this.categoryHttp.deleteCategoryById(categoryId);
  }
}
