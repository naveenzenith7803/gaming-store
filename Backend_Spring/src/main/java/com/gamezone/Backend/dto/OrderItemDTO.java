package com.gamezone.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDTO {
    private Long id;
    private Long orderId;  // To link to Order
    private Long productId; // To link to Product
    private Integer quantity;
}

