import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/productService/product-service.service';
import { CategoryService } from '../services/categoryService/category-service.service';
import { ImageService } from '../services/imageService/image-service.service';
import { Product } from '../models/productModel/product';
import { Category } from '../models/categoryModel/category';
import { Image } from '../models/imageModel/image';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  categories: Category[] = [];
  images: Image[] = [];
  
  selectedSubcategories: Category[] = [];
  selectedCategoryId: number | null = null;
  selectedSubcategoryId: number | null = null;
  product: Product = { id:0, name: '', price: 0, quantity: 0, description: '', imageId: 0, categoryId: 0 }; // Initialize with default values


  imageUrlError: string | null = null; // For storing the error message

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct(productId);
    this.loadCategories();
    this.fetchImages();
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (data) => (this.product = data),
      error: () => this.router.navigate(['/admin-products']),
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
      const Category = this.categories.find(cat => cat.id === this.product.categoryId);
      this.product.categoryName=Category.name;
    });
  }

  fetchImages() {
    this.imageService.getAllImages().subscribe(images => {
      this.images = images;
      const image = this.images.find(img => img.id === this.product.imageId);
      this.product.imageUrl=image.url;
    });
  }

  onCategoryChange(event: Event): void {
    const selectedCategoryName = (event.target as HTMLSelectElement).value;
    const selectedCategory = this.categories.find(cat => cat.name === selectedCategoryName);
    

    if (selectedCategory) {
      this.selectedCategoryId = selectedCategory.id;
      this.product.categoryId=this.selectedCategoryId;
      this.selectedSubcategoryId = null; // Reset selected subcategory

      // Find child categories
      this.selectedSubcategories = this.categories.filter(cat => cat.parentCategoryId === this.selectedCategoryId);
    } else {
      this.selectedSubcategories = [];
      this.selectedCategoryId = null; // Reset if category not found
    }
  }

  onSubcategoryChange(event: Event): void {
    this.selectedSubcategoryId = +((event.target as HTMLSelectElement).value);
    this.product.categoryId=this.selectedCategoryId;
  }

  onSubmit(productForm: NgForm) {
    this.imageUrlError = null; // Reset the error message

    if (productForm.valid) {
      const imageUrl = productForm.value.imageUrl;

      // Find matching image ID
      const image = this.images.find(img => img.url === imageUrl);
      const imageId = image ? image.id : null;
      
      
      this.product.imageId=imageId;

      // Check if image ID is valid
      if (!imageId) {
        this.imageUrlError = 'Image URL is invalid';
        return; // Stop further execution
      }
      
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => this.router.navigate(['/admin-products']),
        error: (err) => console.error(err),
      });
      console.log("Product Updated");
    } else {
      console.log('Form is invalid');
    }
  }
}
