package com.gamezone.Backend.Controller;

import com.gamezone.Backend.Entity.Product;
import com.gamezone.Backend.Service.ProductService;
import com.gamezone.Backend.dto.ProductDTO;
import com.gamezone.Backend.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.gamezone.Backend.Entity.Product;
import com.gamezone.Backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return products.stream()
                .map(ProductMapper::toProductDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(p -> ResponseEntity.ok(ProductMapper.toProductDTO(p)))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> getProductNames(@RequestParam String query) {
        List<String> productNames = productService.findProductNamesByQuery(query);
        return ResponseEntity.ok(productNames);
    }

    @PostMapping
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        Product product = ProductMapper.toProduct(productDTO);
        Product createdProduct = productService.createProduct(product);
        return ProductMapper.toProductDTO(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        try {
            Product product = ProductMapper.toProduct(productDTO);
            product.setId(id); // Ensure we set the ID for the update
            Product updatedProduct = productService.updateProduct(id, product);
            return ResponseEntity.ok(ProductMapper.toProductDTO(updatedProduct));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

