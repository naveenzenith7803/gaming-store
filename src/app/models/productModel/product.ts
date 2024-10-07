// src/app/models/product.model.ts

  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    imageId: number;
    imageUrl?: string;  
    categoryName?: string;
  }
  