import { OrderItemResponse } from './OrderItemResponse';
import { OrderStatus } from './OrderStatus';
import { ShippingInfoResponse } from './ShippingInfoResponse';

export interface OrderResponse {
  id: number;
  userId: number;
  orderStatus: OrderStatus;
  orderItems: OrderItemResponse[];
  totalPrice: number;
  shippingCost: number;
  shippingInfo: ShippingInfoResponse | null;
  paidDate: string;
}
