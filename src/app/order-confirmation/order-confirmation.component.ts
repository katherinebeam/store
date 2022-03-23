import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order: Order = {
    fullName: '',
    address: '',
    creditCardNumber: '',
    totalCost: 0,
  }

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.order = this.orderService.getOrder();
  }
}
