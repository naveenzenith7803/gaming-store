// src/app/admin/admin-products.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/productService/product-service.service'; // Adjust path as necessary
import { Product } from '../models/productModel/product'; // Adjust path as necessary
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true; // For loading state
  errorMessage: string | null = null; // For error handling

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getAllProducts().pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load products.';
        this.loading = false;
        return of([]); // Return an empty array on error
      })
    ).subscribe(products => {
      this.products = products;
      this.loading = false; // Stop loading
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProductById(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      });
    }
  }
}
