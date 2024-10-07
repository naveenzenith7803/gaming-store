package com.gamezone.Backend.mapper;

import com.gamezone.Backend.Entity.Order;
import com.gamezone.Backend.Entity.OrderItem;
import com.gamezone.Backend.dto.OrderDTO;

import java.util.stream.Collectors;

public class OrderMapper {

    // Convert Order entity to OrderDTO
    public static OrderDTO toOrderDTO(Order order) {
        return new OrderDTO(
                order.getId(),
                order.getUser().getId(), // Get user ID
                order.getOrderItems().stream()
                        .map(OrderItem::getId) // Get order item IDs
                        .collect(Collectors.toSet())
        );
    }

    // Convert OrderDTO to Order entity
    public static Order toOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setId(orderDTO.getId()); // Set ID in case of update
        // Other properties would be set in the service layer based on IDs
        return order;
    }
}

