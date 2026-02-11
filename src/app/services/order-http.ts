import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderResponse } from '../models/response/order/OrderResponse';
import { PageModel } from '../models/PageModel';

@Injectable({
  providedIn: 'root',
})
export class OrderHttp {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/admin/orders';

  getOrders(
    pageNumber: number,
    pageSize: number,
    status?: string,
    userId?: number,
  ): Observable<PageModel<OrderResponse>> {
    let params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());

    if (status) {
      params = params.set('status', status);
    }

    if (userId) {
      params = params.set('userId', userId.toString());
    }

    return this.httpClient.get<PageModel<OrderResponse>>(this.apiUrl, { params });
  }

  retryPayment(orderId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/${orderId}/retry`, {});
  }

  getOrderCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/count`);
  }
}
