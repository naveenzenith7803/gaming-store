package com.gamezone.Backend.mapper;

import com.gamezone.Backend.Entity.OrderItem;
import com.gamezone.Backend.dto.OrderItemDTO;

public class OrderItemMapper {

    // Convert OrderItem entity to OrderItemDTO
    public static OrderItemDTO toOrderItemDTO(OrderItem orderItem) {
        return new OrderItemDTO(
                orderItem.getId(),
                orderItem.getOrder().getId(),    // Get order ID
                orderItem.getProduct().getId(),   // Get product ID
                orderItem.getQuantity()
        );
    }

    // Convert OrderItemDTO to OrderItem entity
    public static OrderItem toOrderItem(OrderItemDTO orderItemDTO) {
        OrderItem orderItem = new OrderItem();
        orderItem.setId(orderItemDTO.getId()); // In case of update, set ID
        orderItem.setQuantity(orderItemDTO.getQuantity());
        return orderItem;
    }
}

