package com.gamezone.Backend.mapper;

import com.gamezone.Backend.Entity.Cart;
import com.gamezone.Backend.Entity.CartItem;
import com.gamezone.Backend.Entity.Product;
import com.gamezone.Backend.dto.CartItemDTO;

public class CartItemMapper {

    // Convert CartItem entity to CartItemDTO
    public static CartItemDTO toCartItemDTO(CartItem cartItem) {
        return new CartItemDTO(
                cartItem.getId(),
                cartItem.getProduct() != null ? cartItem.getProduct().getId() : null,
                cartItem.getCart() != null ? cartItem.getCart().getId() : null,
                cartItem.getQuantity()
        );
    }

    // Convert CartItemDTO to CartItem entity
    public static CartItem toCartItem(CartItemDTO cartItemDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setId(cartItemDTO.getId()); // Set ID in case of update
        cartItem.setQuantity(cartItemDTO.getQuantity());

        // Handle product association
        if (cartItemDTO.getProductId() != null) {
            Product product = new Product();
            product.setId(cartItemDTO.getProductId());
            cartItem.setProduct(product);
        }

        if (cartItemDTO.getCartId() != null) {
            Cart cart = new Cart(); // Assuming you have a Cart class
            cart.setId(cartItemDTO.getCartId()); // Set the cart ID
            cartItem.setCart(cart); // Associate the cart with the cart item
        }

        return cartItem;
    }
}
