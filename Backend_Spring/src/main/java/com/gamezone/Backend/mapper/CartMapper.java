package com.gamezone.Backend.mapper;

import com.gamezone.Backend.Entity.Cart;
import com.gamezone.Backend.Entity.User;
import com.gamezone.Backend.dto.CartDTO;

public class CartMapper {

    // Convert Cart entity to CartDTO
    public static CartDTO toCartDTO(Cart cart) {
        return new CartDTO(
                cart.getId(),
                cart.getUser() != null ? cart.getUser().getId() : null // Assuming Cart has a User relationship
        );
    }

    // Convert CartDTO to Cart entity
    public static Cart toCart(CartDTO cartDTO) {
        Cart cart = new Cart();
        cart.setId(cartDTO.getId()); // Set ID in case of update
        // Handle user association
        if (cartDTO.getUserId() != null) {
            User user = new User();
            user.setId(cartDTO.getUserId());
            cart.setUser(user);
        }
        return cart;
    }
}
