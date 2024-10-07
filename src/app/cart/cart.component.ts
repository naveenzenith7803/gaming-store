import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cartService/cart-service.service';
import { CartItem } from '../models/cartItemModel/cart-item'; 
import { CartItemService } from '../services/cartItemService/cart-item-service.service';
import { ProductService } from '../services/productService/product-service.service';
import { ImageService } from '../services/imageService/image-service.service'; // Assuming you have this service
import { forkJoin, map } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [NgFor, CommonModule, NgIf, RouterLink, FormsModule],
  providers: [NavbarComponent]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  sortOrder: string = 'asc';

  constructor(
    private cartService: CartService, 
    private cartItemService: CartItemService, 
    private productService: ProductService,
    private imageService: ImageService,
    private navbarComponent: NavbarComponent
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.fetchProductDetails(); // Fetch product details when cart items change
      this.sortCartItems();
    });
  }

  

  fetchProductDetails() {
    if (this.cartItems.length === 0) {
      this.totalPrice = 0;
      return;
    }

    

    // Create observables for fetching product details and images
    const productObservables = this.cartItems.map(item => {
      return this.productService.getProductById(item.productId).pipe(
        map(product => {
          item.productName = product.name; // Get product name
          item.productPrice = product.price; // Get product price
          return this.imageService.getImageById(product.imageId).pipe( // Assuming `imageId` is part of the product
            map(image => {
              item.productImage = image.url; // Get product image URL
            })
          );
        })
      );
    });

    // Use forkJoin to wait for all observables to complete
    forkJoin(productObservables).subscribe(() => {
      this.calculateTotalPrice(); // Calculate total price after fetching details
    }, error => {
      console.error('Failed to fetch product details', error);
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return Math.round(total + (item.productPrice ? item.productPrice * item.quantity : 0));
    }, 0);
  }

  sortCartItems() {
    this.cartItems.sort((a, b) => {
      const priceA = a.productPrice * a.quantity;
      const priceB = b.productPrice * b.quantity;

      return this.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
  }

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.sortOrder = target.value;
    this.sortCartItems();
  }

  increaseQuantity(item: CartItem) {
    this.cartService.addToCart(item); // Update cart item in the service
    this.calculateTotalPrice(); // Recalculate total price
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity=item.quantity-2;
      this.cartService.addToCart(item); // Update cart item
    } else {
      this.removeItem(item);
    }
    this.calculateTotalPrice();
  }

  removeItem(item: CartItem) {
    this.cartItemService.removeCartItem(item.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(i => i.id !== item.id);
      this.cartService.updateCartItems(this.cartItems); // Update the cart state
      this.calculateTotalPrice();
    }, error => {
      console.error('Failed to remove item from cart', error);
    });
  }
}
