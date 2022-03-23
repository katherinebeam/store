import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { Order } from '../models/order';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: Cart = {
    cartItems: [],
    totalCost: 0
  }
  fullName: string = '';
  address: string = '';
  creditCardNumber: string = '';

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
  
  updateCart(cartItem: CartItem): void {
    this.cart = this.cartService.updateCart(this.cart, cartItem);
  }

  onSubmit(): void {
    const order: Order = {
      totalCost: this.cart.totalCost,
      fullName: this.fullName,
      address: this.address,
      creditCardNumber: this.creditCardNumber,
    }
    this.orderService.saveOrder(order);
    this.cartService.resetCart(this.cart);
    this.router.navigateByUrl('/order-confirmation');
  }
}
