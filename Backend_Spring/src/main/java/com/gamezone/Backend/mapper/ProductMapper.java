package com.gamezone.Backend.mapper;

import com.gamezone.Backend.Entity.Product;
import com.gamezone.Backend.dto.ProductDTO;

public class ProductMapper {

    // Convert Product entity to ProductDTO
    public static ProductDTO toProductDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getQuantity(),
                product.getCategory().getId(), // Get category ID
                product.getImage().getId()      // Get image ID
        );
    }

    // Convert ProductDTO to Product entity
    public static Product toProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setId(productDTO.getId()); // In case of update, set ID
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setQuantity(productDTO.getQuantity());
        // Here you might need to set category and image entities from their IDs if needed
        return product;
    }
}

