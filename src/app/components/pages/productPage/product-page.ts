import { Component, inject, OnInit, OnDestroy, Input } from '@angular/core';
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
import { ImageUploadComponent } from '../../ui/image-upload-component/image-upload-component';
import { AlertService } from '../../../services/AlertService';
import { TgmButtonComponent } from '../../ui/tgm-button/tgm-button';
import { ProductInsertRequest } from '../../../models/request/product-insert-request';
import { PaginationComponent } from '../../ui/pagination-component/pagination-component';
import { ProductMaterial, ProductMaterialLabels } from '../../../models/ProductMaterial';

@Component({
  selector: 'product-page',
  imports: [
    TableComponent,
    DetailDialogComponent,
    CommonModule,
    FormsModule,
    ImageUploadComponent,
    TgmButtonComponent,
    PaginationComponent,
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit, OnDestroy {
  @Input() pageSize: number = 5;
  pageNumber: number = 1;
  totalCategoriesCount: number = 0;

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  subscription!: Subscription;

  productsPage!: PageModel<ProductSummaryResponse>;
  categoriesPage!: PageModel<CategoryResponse>;
  columns: string[] = ['id', 'image', 'name', 'price', 'category', 'material'];

  createdProduct: ProductInsertRequest = {
    name: '',
    description: '',
    basePrice: 0,
    discountPercentage: 0,
    image: '',
    imageName: '',
    categoryId: 0,
    material: ProductMaterial.STEEL,
  };

  ProductMaterial = ProductMaterial;
  ProductMaterialLabels = ProductMaterialLabels;
  materialOptions = Object.values(ProductMaterial);

  detailedProduct!: ProductDetailResponse;
  detaildetailDialogOpen: boolean = false;
  creationDialogOpen: boolean = false;

  alertService = inject(AlertService);

  ngOnInit() {
    this.loadProducts(this.pageNumber, this.pageSize);
    this.getTotalCategoriesCount();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTotalCategoriesCount() {
    return this.categoryService.getCategoryCount().subscribe({
      next: (count) => {
        this.totalCategoriesCount = count;
      },
      error: (error) => {
        console.error('Error fetching category count:', error);
      },
    });
  }
  setImage(ImageModel: { image: string; imageName: string }) {
    this.detailedProduct.image = ImageModel.image;
    this.detailedProduct.imageName = ImageModel.imageName;
  }

  setImageInsert(ImageModel: { image: string; imageName: string }) {
    this.createdProduct.image = ImageModel.image;
    this.createdProduct.imageName = ImageModel.imageName;
  }

  loadCategories() {
    this.subscription = this.categoryService.getCategories(1, this.totalCategoriesCount).subscribe({
      next: (data) => {
        console.log('Categories loaded:', data);
        data.data.push({ id: 0, name: 'Uncategorized' });
        this.categoriesPage = data;
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

  loadProducts(pageNumber: number, pageSize: number) {
    this.subscription = this.productService.getProducts(pageNumber, pageSize).subscribe({
      next: (data) => {
        data.data.map((element) => {
          element.category =
            element.category === null ? { id: 0, name: 'Uncategorized' } : element.category;
          element.image = element.image ? element.image : 'assets/product-no-image.svg';
        });
        console.log('Products loaded:', data);
        this.productsPage = data;
      },
      error: (error) => {
        this.alertService.error({
          title: 'Error',
          text: 'Failed to load products. Please try again later.',
        });
        console.error('Error fetching products:', error);
      },
    });
  }

  onPageChange(newPage: number) {
    this.pageNumber = newPage;
    this.loadProducts(this.pageNumber, this.pageSize);
  }

  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.pageNumber = 1; // Reset to first page when changing page size
    this.loadProducts(this.pageNumber, this.pageSize);
  }

  openItemDetail(id: number) {
    console.log('Product ID clicked:', id);
    this.getProduct(id);
    this.loadCategories();
    this.detaildetailDialogOpen = true;
  }

  openCreationDialog() {
    console.log('Entrando en creacion de producto');
    this.loadCategories();
    this.creationDialogOpen = true;
  }

  getProduct(id: number) {
    return this.productService.getProductById(id).subscribe({
      next: (data) => {
        data.category = data.category === null ? { id: 0, name: 'Uncategorized' } : data.category;
        this.detailedProduct = data;
      },
      error: (error) => {
        this.alertService.error({
          title: 'Error',
          text: 'Failed to load product details. Please try again later.',
        });
        console.error('Error fetching product details:', error);
      },
    });
  }

  closeDialog() {
    this.detaildetailDialogOpen = false;
    this.creationDialogOpen = false;
  }

  createProduct() {
    let newProduct: ProductInsertRequest = {
      name: this.createdProduct.name,
      description: this.createdProduct.description,
      basePrice: this.createdProduct.basePrice,
      discountPercentage: this.createdProduct.discountPercentage,
      image: this.createdProduct.image.split(',')[1],
      imageName: this.createdProduct.imageName,
      categoryId: this.createdProduct.categoryId,
      material: this.createdProduct.material,
    };
    console.log('Creating product:', newProduct);
    this.productService.createProduct(newProduct).subscribe({
      next: (data) => {
        this.alertService.success({
          title: 'Product Created',
          text: 'The product has been successfully created.',
        });
        this.loadProducts(this.pageNumber, this.pageSize);
      },
      error: (error) => {
        this.alertService.error({
          title: 'Error',
          text: 'Failed to create product. Please try again later.',
        });
        console.error('Error creating product:', error);
      },
    });
    this.closeDialog();
  }

  updateProduct() {
    console.log('Prodct:', this.detailedProduct);
    console.log(this.detailedProduct.name);
    
    if (this.detailedProduct) {
      let updatedProduct: ProductUpdateRequest = {
        id: this.detailedProduct.id,
        name: this.detailedProduct.name,
        description: this.detailedProduct.description,
        basePrice: this.detailedProduct.basePrice,
        discountPercentage: this.detailedProduct.discountPercentage,
        image: this.detailedProduct.image.split(',')[1] || this.detailedProduct.image,
        imageName: this.detailedProduct.imageName,
        categoryId: this.detailedProduct.category.id,
        material: this.detailedProduct.material,
      };
      console.log('Updating product:', this.detailedProduct);
      this.productService.updateProduct(this.detailedProduct.id, updatedProduct).subscribe({
        next: (data) => {
          this.alertService.success({
            title: 'Product Updated',
            text: 'The product has been successfully updated.',
          });
          this.loadProducts(this.pageNumber, this.pageSize);
        },
        error: (error) => {
          this.alertService.error({
            title: 'Error',
            text:
              error.error.message.split(':')[1] === undefined
                ? 'Failed to update product. Please try again later.'
                : error.error.message.split(':')[1],
          });
          console.error('Error updating product:', error);
        },
      });
      this.closeDialog();
    }
  }

  deleteProduct() {
    this.productService.deleteProductById(this.detailedProduct.id).subscribe({
      next: () => {
        this.alertService.success({
          title: 'Product Deleted',
          text: 'The product has been successfully deleted.',
        });
        if (this.productsPage.data.length === 1 && this.pageNumber > 1) {
          this.pageNumber--;
        }
        this.closeDialog();
        this.loadProducts(this.pageNumber, this.pageSize);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.alertService.error({
          title: 'Error',
          text: 'Failed to delete product. Please try again later.',
        });
      },
    });
  }
}
