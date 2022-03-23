import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product = {
    id: 0,
    description: '',
    name: '',
    price: 0,
    url: '',
  };
  cart: Cart = {
    cartItems: [],
    totalCost: 0,
  }
  productId: number = 0;

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

  constructor(private productService: ProductService, private cartService: CartService, private readonly route: ActivatedRoute,) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.productService.getProducts().subscribe(returnedProducts => {
        const foundProduct = returnedProducts.find((p: { id: number; }) => p.id == this.productId);
        if (foundProduct) {
          this.product = foundProduct;
        }
      });
      this.cart = this.cartService.getCart();
    });
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      productId: product.id,
      cost: product.price,
      quantity: this.quantity,
      name: product.name,
      url: product.url,
    }
    this.cartService.addItemsToCart(this.cart, cartItem);
    alert('Added to cart!');
  }
}
