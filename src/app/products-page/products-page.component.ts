import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/productService/product-service.service';
import { Product } from '../models/productModel/product';
import { CartItem } from '../models/cartItemModel/cart-item';
import { CartService } from '../services/cartService/cart-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { CategoryService } from '../services/categoryService/category-service.service';
import { Category } from '../models/categoryModel/category';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor]
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryId: number | null = null;
  categoryName: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // Get the category name from the URL and replace hyphens with spaces
    const categoryNameFromUrl = this.route.snapshot.paramMap.get('category')?.replace(/-/g, ' '); 

    // Fetch all products
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;

      // Fetch all categories to find the ID
      this.categoryService.getAllCategories().subscribe(categories => {
        const foundCategory = categories.find(cat => 
          cat.name.toLowerCase() === categoryNameFromUrl?.toLowerCase()
        );

        if (foundCategory) {
          this.categoryId = foundCategory.id; // Get the ID
          this.categoryName = foundCategory.name; // Get the name
          console.log(`Category found: ${this.categoryName} (ID: ${this.categoryId})`);

          // Filter products by category ID
          this.filteredProducts = this.products.filter(product => product.categoryId === this.categoryId);
          console.log(`Filtered products:`, this.filteredProducts);
        } else {
          console.log(`No category found for: ${categoryNameFromUrl}`);
          this.filteredProducts = this.products; // Show all products if no category is found
        }
      });
    });
  }

  addToCart(product: Product) {
    const cartItem: CartItem = {
      cartId: 1,
      productId: product.id, 
      quantity: 1 
    };
    
    this.cartService.addToCart(cartItem);
    console.log(`${product.name} added to cart!`);
  }
}