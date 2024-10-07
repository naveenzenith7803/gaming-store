package com.gamezone.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private Long id;
    private String name;
    private Long parentCategoryId; // To represent the parent category if exists
    private Set<Long> childCategoryIds; // To represent child categories
}

