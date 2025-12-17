import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { ProductSummaryResponse } from '../../../models/response/product-summary-response';
import { Subscription } from 'rxjs';
import { TableComponent } from '../../ui/table-component/table-component';

@Component({
  selector: 'product-page',
  imports: [TableComponent],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage {
  productService = inject(ProductService);
  subscription!: Subscription;
  products!: ProductSummaryResponse[];
  columns: string[] = ['id', 'name', 'category'];

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadProducts() {
    this.subscription = this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  getAll() {
    return this.products;
  }
  
}
