import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cart: Cart = {
    cartItems: [],
    totalCost: 0,
  };

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(returnedProducts => {
      this.products = returnedProducts;
    });
    const cart = this.cartService.getCart();
    if (cart.cartItems) {
      this.cart = cart;
    }
  }

  addItemsToCart(cartItem: CartItem): void {
    this.cartService.addItemsToCart(this.cart, cartItem);
    alert('Added to cart!');
  }
}
