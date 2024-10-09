import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/productModel/product';
import { ProductService } from '../services/productService/product-service.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cartService/cart-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  showPopup: boolean = false;
  product!: Product; // Product to display
  reqQuantity: number = 1;
  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Get the product ID from the route
    if (productId) {
      this.productService.getProductById(+productId).subscribe((product) => {
        this.product = product; // Set the product details
      });
    }
  }


  changeQuantity(amount: number) {
    if (this.reqQuantity + amount <= this.product.quantity && this.reqQuantity + amount > 0) {
        this.reqQuantity += amount;
    }
}

addToCart(product: Product) {
    if (this.reqQuantity > product.quantity || this.reqQuantity < 1) return;

    this.showPopup = true;
    setTimeout(() => {
        this.showPopup = false;
    }, 1000); // Adjust duration as needed

    console.log(`${this.reqQuantity} of ${product.name} added to cart!`);
    // You can add animation logic here later
}

toggleWishlist(product: Product) {
    // Implement the logic for adding/removing from wishlist
    console.log(`${product.name} added to wishlist!`);
}

activeFaq: number | null = null; // Initialize with null or a number

    toggleFaq(faqNumber: number) {
        if (this.activeFaq === faqNumber) {
            this.activeFaq = null; // Collapse if already open
        } else {
            this.activeFaq = faqNumber; // Open the clicked FAQ
        }
    }
}