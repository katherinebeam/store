import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    url: '',
  }
  @Output() addItemsToCart: EventEmitter<CartItem> = new EventEmitter;

  quantityOptions = [
    {id: 1, value: 1},
    {id: 2, value: 2},
    {id: 3, value: 3},
    {id: 4, value: 4},
    {id: 5, value: 5},
    {id: 6, value: 6},
    {id: 7, value: 7},
    {id: 8, value: 8},
    {id: 9, value: 9},
    {id: 10, value: 10},
  ];

  quantity: number = 1;

  constructor() { }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      productId: product.id,
      quantity: parseInt(this.quantity.toString()),
      name: product.name,
      url: product.url,
      cost: product.price,
    }
    this.addItemsToCart.emit(cartItem)
  }
}
