import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private cartService: CartService) { }

  saveOrder(order: Order): void {
    localStorage.setItem("order", JSON.stringify(order));
  }

  getOrder(): Order {
    return JSON.parse(localStorage.getItem("order") || '{}');
  }
}
