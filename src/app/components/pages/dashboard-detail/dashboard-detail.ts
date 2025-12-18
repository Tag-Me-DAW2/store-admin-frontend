import { Component, inject } from '@angular/core';
import { DashboardDetailCard } from '../../ui/dashboard-detail-card/dashboard-detail-card';
import { UserService } from '../../../services/user-service';
import { ProductService } from '../../../services/product-service';
import { CategoryService } from '../../../services/category-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dashboard-detail-page',
  templateUrl: './dashboard-detail.html',
  styleUrls: ['./dashboard-detail.scss'],
  imports: [DashboardDetailCard, RouterLink],
})
export class DashboardDetailPage {
  categoryCount!: number;
  productCount!: number;
  userCount!: number;

  userService = inject(UserService);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);

  ngOnInit() {
    this.fetchCounts();
  }

  fetchCounts() {
    this.userService.getUserCount().subscribe({
      next: (count) => {
        this.userCount = count;
      },
      error: (err) => {
        console.error('Error fetching user count:', err);
      },
    });

    this.productService.getProductCount().subscribe({
      next: (count) => {
        this.productCount = count;
      },
      error: (err) => {
        console.error('Error fetching product count:', err);
      },
    });
    this.categoryService.getCategoryCount().subscribe({
      next: (count) => {
        this.categoryCount = count;
      },
      error: (err) => {
        console.error('Error fetching category count:', err);
      },
    });
  }
}
