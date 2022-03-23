import { Injectable, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  cart: Cart;
  constructor() {
    this.cart = {
      cartItems: [],
      totalCost: 0
   }
  }

  ngOnInit(): void {
    this.cart = this.getCart();
  }

  getCart(): Cart {
    return JSON.parse(localStorage.getItem("cart") || '{}');
  }

  addItemsToCart(cartItem: CartItem): void {
    const foundItem = this.cart.cartItems.find(i => i.productId == cartItem.productId);
    if (foundItem) {
      foundItem.quantity += cartItem.quantity;
    } else {
      this.cart.cartItems.push(cartItem);
    }
    this.calculateTotalCost();
    this.saveCart();
  }

  updateCart(cartItem: CartItem): Cart {
    const foundItem = this.cart.cartItems.find(i => i.productId == cartItem.productId);
    if (foundItem) {
      foundItem.quantity = cartItem.quantity;
      if (foundItem.quantity === 0) {
        this.cart.cartItems = this.cart.cartItems.filter(i => i.productId !== foundItem.productId);
      }
    }
    this.calculateTotalCost();
    this.saveCart();
    return this.cart;
  }

  calculateTotalCost() {
    let cost = 0;
    for(let i = 0; i < this.cart.cartItems.length; i++) {
      cost += this.cart.cartItems[i].quantity * this.cart.cartItems[i].cost;
    }
    this.cart.totalCost = cost;
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}
