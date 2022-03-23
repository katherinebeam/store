import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() { }

  saveOrder(order: Order) {
    localStorage.setItem("order", JSON.stringify(order));
  }

  getOrder(): Order {
    return JSON.parse(localStorage.getItem("order") || '{}');
  }
}
