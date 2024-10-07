package com.gamezone.Backend.Repository;

import com.gamezone.Backend.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
