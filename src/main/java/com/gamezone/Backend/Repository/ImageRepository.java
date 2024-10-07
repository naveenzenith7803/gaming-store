package com.gamezone.Backend.Repository;

import com.gamezone.Backend.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
