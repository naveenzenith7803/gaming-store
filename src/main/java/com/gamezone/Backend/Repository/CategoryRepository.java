package com.gamezone.Backend.Repository;

import com.gamezone.Backend.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
