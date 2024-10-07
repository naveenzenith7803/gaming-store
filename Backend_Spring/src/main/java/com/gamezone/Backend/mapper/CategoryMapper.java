package com.gamezone.Backend.mapper;

import com.gamezone.Backend.Entity.Category;
import com.gamezone.Backend.dto.CategoryDTO;

import java.util.stream.Collectors;

public class CategoryMapper {

    // Convert Category entity to CategoryDTO
    public static CategoryDTO toCategoryDTO(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getParentCategory() != null ? category.getParentCategory().getId() : null,
                category.getChildCategories() != null ? category.getChildCategories().stream().map(Category::getId).collect(Collectors.toSet()) : null
        );
    }

    // Convert CategoryDTO to Category entity
    public static Category toCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setId(categoryDTO.getId()); // Set ID in case of update
        category.setName(categoryDTO.getName());

        // Handle parent category
        if (categoryDTO.getParentCategoryId() != null) {
            Category parentCategory = new Category();
            parentCategory.setId(categoryDTO.getParentCategoryId());
            category.setParentCategory(parentCategory);
        }

        return category;
    }
}

