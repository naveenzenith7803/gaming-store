import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  product: any; // Replace with your product interface
  categories = []; // Dummy data, replace with actual categories
  selectedCategory: string;
  selectedSubcategories: string[] = []; // Replace with actual subcategories

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the product ID from the route parameters
    const productId = this.route.snapshot.paramMap.get('id');

    // Replace this with your logic to fetch the product details based on the ID
    this.product = this.getProductById(productId); // Replace with actual service call

    // Set selected category and subcategories based on the product
    this.selectedCategory = this.product.category;
    this.selectedSubcategories = this.getSubcategories(this.selectedCategory);
  }

  getProductById(id: string) {
    // Dummy product data, replace with actual fetch logic
    return {
      id: id,
      name: 'Sample Product',
      price: 100,
      quantity: 10,
      description: 'This is a sample product description.',
      imageUrl: 'http://example.com/sample.jpg',
      category: 'Electronics',
      subcategory: 'Mobiles'
    };
  }

  getSubcategories(category: string) {
    // Replace with actual logic to fetch subcategories based on the category
    return category === 'Electronics' ? ['Mobiles', 'Laptops', 'Tablets'] : [];
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.selectedSubcategories = this.getSubcategories(this.selectedCategory);
  }

  onUpdate(form: any) {
    if (form.valid) {
      // Handle update logic here (e.g., call a service to update the product)
      console.log('Product updated:', form.value);
    }
  }
}