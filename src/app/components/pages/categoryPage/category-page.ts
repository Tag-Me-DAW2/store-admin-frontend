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

@Component({
  selector: 'app-category-page',
  imports: [TableComponent, DetailDialogComponent, FormsModule],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage {
  categoryService = inject(CategoryService);
  subscription!: Subscription;

  categoryPage!: PageModel<CategoryResponse>;
  columns: string[] = ['id', 'name'];

  detailedCategory!: CategoryResponse;
  dialogOpen: boolean = false;

  alertService = inject(AlertService);

  ngOnInit() {
    this.loadCategories();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCategories() {
    this.subscription = this.categoryService.getCategories().subscribe({
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

  openItemDetail(id: number) {
    console.log('Category ID clicked:', id);
    this.getCategory(id);
    this.dialogOpen = true;
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
    this.dialogOpen = false;
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
          this.loadCategories();
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
        this.closeDialog();
        this.loadCategories();
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
