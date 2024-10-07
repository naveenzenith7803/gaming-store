import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cartItemModel/cart-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private apiUrl = 'http://localhost:8082/api/cart-items'; // Update with your actual API endpoint

  constructor(private http: HttpClient) {}

  createCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.apiUrl, cartItem);
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/${cartItem.id}`, cartItem);
  }

  getCartItems(cartId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart/${cartId}`);
  }

  

  removeCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
