import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import { Subscription } from 'rxjs';
import { CategoryResponse } from '../../../models/response/category-response';
import { PageModel } from '../../../models/PageModel';
import { CategoryRequest } from '../../../models/request/category-request';
import { TableComponent } from '../../ui/table-component/table-component';
import { DetailDialogComponent } from '../../ui/detail-dialog/detail-dialog';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../services/AlertService';
import { TgmButtonComponent } from "../../ui/tgm-button/tgm-button";
import { PaginationComponent } from "../../ui/pagination-component/pagination-component";

@Component({
  selector: 'app-category-page',
  imports: [TableComponent, DetailDialogComponent, FormsModule, TgmButtonComponent, PaginationComponent],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage {
  categoryService = inject(CategoryService);
  subscription!: Subscription;

  pageSize: number = 5;
  pageNumber: number = 1;

  categoryPage!: PageModel<CategoryResponse>;
  columns: string[] = ['id', 'name'];

  detailedCategory!: CategoryResponse;
  createdCategory: CategoryRequest = {
    id: null,
    name: '',
  };
  detailDialogOpen: boolean = false;
  creationDialogOpen: boolean = false;

  alertService = inject(AlertService);

  ngOnInit() {
    this.loadCategories(this.pageNumber, this.pageSize);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCategories(pageNumber: number, pageSize: number) {
    this.subscription = this.categoryService.getCategories(pageNumber, pageSize).subscribe({
      next: (data) => {
        this.categoryPage = data;
      },
      error: (error) => {
        this.alertService.error({
          title: 'Error',
          text: 'Failed to load categories. Please try again later.',
        });
        console.error('Error fetching categories:', error);
      },
    });
  }

  onPageChange(newPage: number) {
    this.pageNumber = newPage;
    this.loadCategories(this.pageNumber, this.pageSize);
  }

  openItemDetail(id: number) {
    console.log('Category ID clicked:', id);
    this.getCategory(id);
    this.detailDialogOpen = true;
  }

  openCreationDialog() {
    this.creationDialogOpen = true;
  }

  getCategory(id: number) {
    return this.categoryService.getCategoryById(id).subscribe({
      next: (data) => {
        this.detailedCategory = data;
      },
      error: (error) => {
        this.alertService.error({
          title: 'Error',
          text: 'Failed to load category details. Please try again later.',
        });
        console.error('Error fetching category details:', error);
      },
    });
  }

  closeDialog() {
    this.detailDialogOpen = false;
    this.creationDialogOpen = false;
  }

  createCategory() {
    console.log('Category:', this.createdCategory);
    this.categoryService.createCategory(this.createdCategory).subscribe({
      next: (data) => {
        this.alertService.success({
          title: 'Category Created',
          text: 'The category has been successfully created.',
        });
        this.loadCategories(this.pageNumber, this.pageSize);
      },
      error: (error) => {
        console.error('Error creating category:', error);
        this.alertService.error({
          title: 'Error',
          text: 'Failed to create category. Please try again later.',
        });
      },
    });
    this.closeDialog();
  }

  updateCategory() {
    console.log('Category:', this.detailedCategory);
    if (this.detailedCategory) {
      let updatedCategory: CategoryRequest = {
        id: this.detailedCategory.id,
        name: this.detailedCategory.name,
      };

      this.categoryService.updateCategory(this.detailedCategory.id, updatedCategory).subscribe({
        next: (data) => {
          this.alertService.success({
            title: 'Category Updated',
            text: 'The category has been successfully updated.',
          });
          this.loadCategories(this.pageNumber, this.pageSize);
        },
        error: (error) => {
          console.error('Error updating category:', error);
          this.alertService.error({
            title: 'Error',
            text: 'Failed to update category. Please try again later.',
          });
        },
      });
      this.closeDialog();
    }
  }

  deleteCategory() {
    this.categoryService.deleteCategoryById(this.detailedCategory.id).subscribe({
      next: () => {
        this.alertService.success({
          title: 'Category Deleted',
          text: 'The category has been successfully deleted.',
        });
        if (this.categoryPage.data.length === 1 && this.pageNumber > 1) {
          this.pageNumber--;
        }
        this.closeDialog();
        this.loadCategories(this.pageNumber, this.pageSize);
      },
      error: (error) => {
        console.error('Error deleting category:', error);
        this.alertService.error({
          title: 'Error',
          text: 'Failed to delete category. Please try again later.',
        });
      },
    });
  }
}
