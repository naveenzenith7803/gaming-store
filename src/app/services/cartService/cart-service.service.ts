import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cartItemModel/cart-item';
import { BehaviorSubject } from 'rxjs';
import { CartItemService } from '../cartItemService/cart-item-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private userId = 1; // Simulate logged-in user ID
  private cartId: number | null = null; // This will hold the user's cart ID
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  public cartItems$ = this.cartItemsSubject.asObservable();

  

  constructor(private cartItemService: CartItemService) {
    this.fetchCartId(); // Fetch cart ID based on user ID
  }

  updateCartItems(items: CartItem[]) {
    this.cartItems = items;
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  private fetchCartId() {
    // Simulate fetching cart ID based on user ID
    this.cartId = this.userId; // For now, set it directly; replace with actual fetch logic
    this.loadCartItems(); // Load existing cart items when cart ID is fetched
  }

  private loadCartItems() {
    if (this.cartId) {
      this.cartItemService.getCartItems(this.cartId).subscribe(items => {
        this.cartItems = items;
        this.cartItemsSubject.next(this.cartItems);
      });
    }
  }

  addToCart(cartItem: CartItem) {
    const existingItem = this.cartItems.find(item => item.productId === cartItem.productId && item.cartId === this.cartId);
    if (existingItem) {
      existingItem.quantity++; // Increase quantity
      this.cartItemService.updateCartItem(existingItem).subscribe(); // Update the item in the database
    } else {
      cartItem.cartId = this.cartId!;
      this.cartItemService.createCartItem(cartItem).subscribe(newItem => {
        this.cartItems.push(newItem);
        this.cartItemsSubject.next(this.cartItems); // Emit updated cart
      });
    }
    setTimeout(() => {
      this.loadCartItems();
    }, 50);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  
}
