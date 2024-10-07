package com.gamezone.Backend.Controller;

import com.gamezone.Backend.Entity.Category;
import com.gamezone.Backend.Service.CategoryService;
import com.gamezone.Backend.dto.CategoryDTO;
import com.gamezone.Backend.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return categories.stream()
                .map(CategoryMapper::toCategoryDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(c -> ResponseEntity.ok(CategoryMapper.toCategoryDTO(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = CategoryMapper.toCategory(categoryDTO);
        Category createdCategory = categoryService.createCategory(category);
        return CategoryMapper.toCategoryDTO(createdCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        try {
            Category category = CategoryMapper.toCategory(categoryDTO);
            category.setId(id); // Ensure we set the ID for the update
            Category updatedCategory = categoryService.updateCategory(id, category);
            return ResponseEntity.ok(CategoryMapper.toCategoryDTO(updatedCategory));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}

