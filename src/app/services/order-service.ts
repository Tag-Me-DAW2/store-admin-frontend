import { inject, Injectable } from '@angular/core';
import { OrderHttp } from './order-http';
import { Observable } from 'rxjs';
import { OrderResponse } from '../models/response/order/OrderResponse';
import { PageModel } from '../models/PageModel';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderHttp = inject(OrderHttp);

  getOrders(
    pageNumber: number,
    pageSize: number,
    status?: string,
    userId?: number,
  ): Observable<PageModel<OrderResponse>> {
    return this.orderHttp.getOrders(pageNumber, pageSize, status, userId);
  }

  retryPayment(orderId: number): Observable<void> {
    return this.orderHttp.retryPayment(orderId);
  }

  getOrderCount(): Observable<number> {
    return this.orderHttp.getOrderCount();
  }
}
