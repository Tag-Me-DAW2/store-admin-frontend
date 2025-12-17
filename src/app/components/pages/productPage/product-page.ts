import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { ProductSummaryResponse } from '../../../models/response/product-summary-response';
import { Subscription } from 'rxjs';
import { TableComponent } from '../../ui/table-component/table-component';
import { PageModel } from '../../../models/PageModel';
import { ProductDetailResponse } from '../../../models/response/product-detail-response';
import { DetailDialogComponent } from '../../ui/detail-dialog/detail-dialog';
import { ProductUpdateRequest } from '../../../models/request/product-update-request';
import { CategoryResponse } from '../../../models/response/category-response';
import { CategoryService } from '../../../services/category-service';
import { ImageUploadComponent } from "../../ui/image-upload-component/image-upload-component";

@Component({
  selector: 'product-page',
  imports: [TableComponent, DetailDialogComponent, CommonModule, FormsModule, ImageUploadComponent],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit, OnDestroy {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  subscription!: Subscription;

  productsPage!: PageModel<ProductSummaryResponse>;
  categoriesPage!: PageModel<CategoryResponse>;
  columns: string[] = ['id', 'image', 'name', 'price', 'category'];

  detailedProduct!: ProductDetailResponse;
  dialogOpen: boolean = false;

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCategories() {
    this.subscription = this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categoriesPage = data;
        console.log('Categories loaded:', this.categoriesPage);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  loadProducts() {
    this.subscription = this.productService.getProducts().subscribe({
      next: (data) => {
        this.productsPage = data;
        console.log('Products loaded:', this.productsPage);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  openItemDetail(id: number) {
    console.log('Product ID clicked:', id);
    this.getProduct(id);
    this.loadCategories();
    this.dialogOpen = true;
  }

  getProduct(id: number) {
    return this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.detailedProduct = data;
        console.log('Product details:', data);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  closeDialog() {
    this.dialogOpen = false;
  }

  updateProduct() {
    console.log('Category:', this.detailedProduct.category);
    if (this.detailedProduct) {
      let updatedProduct: ProductUpdateRequest = {
        id: this.detailedProduct.id,
        name: this.detailedProduct.name,
        description: this.detailedProduct.description,
        basePrice: this.detailedProduct.basePrice,
        discountPercentage: this.detailedProduct.discountPercentage,
        image: this.detailedProduct.image.split(',')[1] || this.detailedProduct.image,
        categoryId: this.detailedProduct.category.id
      }
      console.log('Updating product:', this.detailedProduct);
      this.productService.updateProduct(this.detailedProduct.id, updatedProduct).subscribe({
        next: (data) => {
          console.log('Product updated successfully:', data);
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      })
      this.closeDialog();
    }
  }

  deleteProduct() {
    this.productService.deleteProductById(this.detailedProduct.id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        alert('Product deleted successfully');
        this.closeDialog();
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      },
    });
  }

  onImageBase64(image64: string) {
    this.detailedProduct.image = image64;
  }
}
