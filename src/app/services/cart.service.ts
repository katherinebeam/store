import { Injectable, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {}

  getCart(): Cart {
    return JSON.parse(localStorage.getItem('cart') || '{}');
  }

  addItemsToCart(cart: Cart, cartItem: CartItem): void {
    const foundItem = cart.cartItems.find(i => i.productId == cartItem.productId);
    if (foundItem) {
      foundItem.quantity += cartItem.quantity;
    } else {
      cart.cartItems.push(cartItem);
    }
    this.calculateTotalCost(cart);
    this.saveCart(cart);
  }

  updateCart(cart: Cart, cartItem: CartItem): Cart {
    const foundItem = cart.cartItems.find(i => i.productId == cartItem.productId);
    if (foundItem) {
      foundItem.quantity = cartItem.quantity;
      if (foundItem.quantity === 0) {
        cart.cartItems = cart.cartItems.filter(i => i.productId !== foundItem.productId);
        alert('Removed from cart!');
      }
    }
    this.calculateTotalCost(cart);
    this.saveCart(cart);
    return cart;
  }

  resetCart(cart: Cart): void {
    cart.cartItems = [];
    cart.totalCost = 0;
    this.saveCart(cart);
  }

  private calculateTotalCost(cart: Cart): void {
    let cost = 0;
    cart.cartItems.forEach(item => cost += item.quantity * item.cost);
    cart.totalCost = cost;
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
