import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/productService/product-service.service';
import { ImageService } from '../services/imageService/image-service.service';
import { CategoryService } from '../services/categoryService/category-service.service';
import { Product } from '../models/productModel/product';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Category } from '../models/categoryModel/category';
import { CartItem } from '../models/cartItemModel/cart-item';
import { CartItemService } from '../services/cartItemService/cart-item-service.service';
import { CartService } from '../services/cartService/cart-service.service';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  categorizedProducts: { [key: number]: Product[] } = {}; // To hold products by category

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private cartItemService: CartItemService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    console.log("getting products");
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      console.log("before");
      console.log(this.products);
      this.products.forEach((product) => {
        this.loadImage(product);
        this.loadCategory(product);
      });
    });

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      setTimeout(() => {
        this.groupProductsByCategory();
      }, 100);
       
    });
  }

  loadImage(product: Product) {
    this.imageService.getImageById(product.imageId).subscribe((image) => {
      product.imageUrl = image.url; // Store image URL
    });
  }

  loadCategory(product: Product) {
    this.categoryService.getCategoryById(product.categoryId).subscribe((category) => {
      product.categoryName = category.name; // Store category name
    });
  }

  groupProductsByCategory() {
    this.categories.forEach(category => {
      console.log("after");
      console.log(this.products);
      this.categorizedProducts[category.id] = this.products.filter(product => product.categoryId === category.id);
    });
  }

  getProductsByCategory(categoryId: number): Product[] {
    return this.categorizedProducts[categoryId] || [];
  }

  scrollLeft(container: HTMLElement) {
    container.scrollBy({ left: -150, behavior: 'smooth' });
    
  }
  
  scrollRight(container: HTMLElement) {
    container.scrollBy({ left: 150, behavior: 'smooth' });
  }

  addToCart(product: Product) {
    const cartItem: CartItem = {
      cartId: 1, // Set as static for now; replace with user's cart ID
      productId: product.id, 
      quantity: 1 // Initialize quantity
    };
    
    this.cartService.addToCart(cartItem); // Use the CartService to add item
    console.log(`${product.name} added to cart!`);
  }
}
