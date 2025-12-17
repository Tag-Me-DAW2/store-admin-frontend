import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import { Subscription } from 'rxjs';
import { CategoryResponse } from '../../../models/response/category-response';
import { PageModel } from '../../../models/PageModel';
import { CategoryRequest } from '../../../models/request/category-request';
import { TableComponent } from "../../ui/table-component/table-component";
import { DetailDialogComponent } from "../../ui/detail-dialog/detail-dialog";
import { FormsModule } from '@angular/forms';

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
        console.log('Categories loaded:', this.categoryPage);
      },
      error: (error) => {
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
        console.log('Category details:', data);
      },
      error: (error) => {
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
      }
      console.log('Updating category:', this.detailedCategory);
      this.categoryService.updateCategory(this.detailedCategory.id, updatedCategory).subscribe({
        next: (data) => {
          console.log('Category updated successfully:', data);
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error updating category:', error);
        }
      })
      this.closeDialog();
    }
  }

  deleteCategory() {
    this.categoryService.deleteCategoryById(this.detailedCategory.id).subscribe({
      next: () => {
        console.log('Category deleted successfully');
        this.closeDialog();
        this.loadCategories();
      },
      error: (error) => {
        console.error('Error deleting category:', error);
        alert('Error deleting category. Please try again.');
      },
    });
  }
}
