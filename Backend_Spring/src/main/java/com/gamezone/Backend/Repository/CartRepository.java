package com.gamezone.Backend.Repository;

import com.gamezone.Backend.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
