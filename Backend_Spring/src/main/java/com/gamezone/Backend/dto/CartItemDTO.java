package com.gamezone.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private Long id;
    private Long productId; // ID of the product associated with this cart item
    private Long cartId;    // ID of the cart this item belongs to
    private int quantity;    // Quantity of the product in the cart
}

