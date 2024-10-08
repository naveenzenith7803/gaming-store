import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cartItemModel/cart-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemService } from '../cartItemService/cart-item-service.service';
import { Cart } from '../../models/cartModel/cart-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private userId: number = Number(localStorage.getItem('userId')); 
  private cartId: number | null = null; // This will hold the user's cart ID
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private apiUrl = 'http://localhost:8082/api/carts';



  

  constructor(private cartItemService: CartItemService, private http: HttpClient) {
    this.fetchCartId(); // Fetch cart ID based on user ID
  }

  updateCartItems(items: CartItem[]) {
    this.cartItems = items;
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  private fetchCartId() {
    this.getCartByUserId(this.userId).subscribe(cart => {
      if (cart) {
        this.cartId = cart.id; 
        this.loadCartItems(); 
      } else {
        console.error('No cart found for user ID:', this.userId);
      }
    }, error => {
      console.error('Error fetching cart by user ID:', error);
    });
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

  getCartByUserId(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/user/${id}`);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  
}
