import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../services/order-service';
import { AlertService } from '../../../services/AlertService';
import { OrderResponse } from '../../../models/response/order/OrderResponse';
import { OrderStatus } from '../../../models/response/order/OrderStatus';
import { PageModel } from '../../../models/PageModel';
import { TableComponent } from '../../ui/table-component/table-component';
import { PaginationComponent } from '../../ui/pagination-component/pagination-component';
import { TgmButtonComponent } from '../../ui/tgm-button/tgm-button';
import { DetailDialogComponent } from '../../ui/detail-dialog/detail-dialog';

@Component({
  selector: 'order-page',
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    PaginationComponent,
    TgmButtonComponent,
    DetailDialogComponent,
  ],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
})
export class OrderPage implements OnInit, OnDestroy {
  @Input() pageSize: number = 10;
  pageNumber: number = 1;

  orderService = inject(OrderService);
  alertService = inject(AlertService);
  subscription!: Subscription;

  ordersPage!: PageModel<OrderResponse>;
  selectedOrder: OrderResponse | null = null;
  detailDialogOpen: boolean = false;

  // Filters
  statusFilter: string = '';
  userIdFilter: string = '';

  // Order status options
  statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'PROCESSING', label: 'En Proceso' },
    { value: 'PAYED', label: 'Completado' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ];

  ngOnInit() {
    this.loadOrders();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadOrders() {
    const userId = this.userIdFilter ? parseInt(this.userIdFilter, 10) : undefined;
    const status = this.statusFilter || undefined;

    this.subscription = this.orderService
      .getOrders(this.pageNumber, this.pageSize, status, userId)
      .subscribe({
        next: (data) => {
          this.ordersPage = data;
          console.log('Orders loaded:', data);
        },
        error: (error) => {
          this.alertService.error({
            title: 'Error',
            text: 'No se pudieron cargar los pedidos. Por favor, inténtalo de nuevo.',
          });
          console.error('Error fetching orders:', error);
        },
      });
  }

  onPageChange(newPage: number) {
    this.pageNumber = newPage;
    this.loadOrders();
  }

  onPageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.pageNumber = 1;
    this.loadOrders();
  }

  applyFilters() {
    this.pageNumber = 1;
    this.loadOrders();
  }

  clearFilters() {
    this.statusFilter = '';
    this.userIdFilter = '';
    this.pageNumber = 1;
    this.loadOrders();
  }

  openOrderDetail(order: OrderResponse) {
    this.selectedOrder = order;
    this.detailDialogOpen = true;
  }

  closeDialog() {
    this.detailDialogOpen = false;
    this.selectedOrder = null;
  }

  retryPayment(orderId: number) {
    this.orderService.retryPayment(orderId).subscribe({
      next: () => {
        this.alertService.success({
          title: 'Pago completado',
          text: 'El pago se ha procesado correctamente. El pedido ha sido marcado como pagado.',
        });
        this.loadOrders();
        this.closeDialog();
      },
      error: (error) => {
        this.alertService.error({
          title: 'Pago fallido',
          text: error.error?.message || 'El pago ha fallado. El pedido ha sido cancelado.',
        });
        this.loadOrders();
        this.closeDialog();
        console.error('Error retrying payment:', error);
      },
    });
  }

  getStatusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'Pendiente',
      [OrderStatus.PROCESSING]: 'En Proceso',
      [OrderStatus.PAYED]: 'Completado',
      [OrderStatus.CANCELLED]: 'Cancelado',
    };
    return labels[status] || status;
  }

  getStatusClass(status: OrderStatus): string {
    const classes: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'status--pending',
      [OrderStatus.PROCESSING]: 'status--processing',
      [OrderStatus.PAYED]: 'status--payed',
      [OrderStatus.CANCELLED]: 'status--cancelled',
    };
    return classes[status] || '';
  }

  getDiscountedPrice(basePrice: number, discountPercentage: number): number {
    if (discountPercentage <= 0) {
      return basePrice;
    }
    return basePrice * (1 - discountPercentage / 100);
  }

  getTotalWithShipping(order: OrderResponse): number {
    return (order.totalPrice || 0) + (order.shippingCost || 0);
  }
}
