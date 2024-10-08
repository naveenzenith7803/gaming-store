import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/productService/product-service.service';
import { CategoryService } from '../services/categoryService/category-service.service';
import { ImageService } from '../services/imageService/image-service.service';
import { Product } from '../models/productModel/product';
import { Category } from '../models/categoryModel/category';
import { Image } from '../models/imageModel/image';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[]=[];
  images: Image[] = [];
  
  selectedSubcategories: Category[] = [];
  selectedCategoryId: number | null = null;
  selectedSubcategoryId: number | null = null;

  imageUrlError: string | null = null; 

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchImages();
  }

  fetchCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      this.filteredCategories=categories.filter(cat=>cat.parentCategoryId==null);
      console.log(categories);
    });
  }

  fetchImages() {
    this.imageService.getAllImages().subscribe(images => {
      this.images = images;
    });
  }

  onCategoryChange(event: Event): void {
    const selectedCategoryName = (event.target as HTMLSelectElement).value;
    const selectedCategory = this.categories.find(cat => cat.name === selectedCategoryName);

    if (selectedCategory) {
      this.selectedCategoryId = selectedCategory.id;
      this.selectedSubcategoryId = null; 

      // Find child categories
      this.selectedSubcategories = this.categories.filter(cat => cat.parentCategoryId === this.selectedCategoryId);
    } else {
      this.selectedSubcategories = [];
      this.selectedCategoryId = null; 
    }
  }

  onSubcategoryChange(event: Event): void {
    this.selectedSubcategoryId = +((event.target as HTMLSelectElement).value);
  }

  onSubmit(productForm: NgForm) {
    this.imageUrlError = null; 

    if (productForm.valid) {
      const imageUrl = productForm.value.imageUrl;

      // Find matching image ID
      const image = this.images.find(img => img.url === imageUrl);
      const imageId = image ? image.id : null;

      // Check if image ID is valid
      if (!imageId) {
        this.imageUrlError = 'Image URL is invalid';
        return; 
      }

      const newProduct: Product = {
        id: 0, 
        name: productForm.value.name,
        description: productForm.value.description,
        price: productForm.value.price,
        quantity: productForm.value.quantity,
        categoryId: this.selectedSubcategoryId || this.selectedCategoryId, 
        imageId: imageId
      };

      this.productService.addProduct(newProduct).subscribe({
        next: () => {
          console.log('Product added successfully');
          productForm.reset();
          this.selectedSubcategories = [];
          this.selectedCategoryId = null;
          this.selectedSubcategoryId = null;
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
