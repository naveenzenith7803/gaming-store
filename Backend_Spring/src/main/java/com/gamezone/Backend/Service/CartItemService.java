package com.gamezone.Backend.Service;

import com.gamezone.Backend.Entity.CartItem;
import com.gamezone.Backend.Repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    public CartItem createCartItem(CartItem cartItem) {
        System.out.println(cartItem.getQuantity()+cartItem.getProduct().getId()+cartItem.getCart().getId());
        return cartItemRepository.save(cartItem);
    }

    public CartItem updateCartItem(Long id, CartItem cartItemDetails) {
        CartItem cartItem = cartItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Cart Item not found"));
        // Update fields as necessary
        cartItem.setQuantity(cartItemDetails.getQuantity()); // Update quantity
        cartItem.getProduct().setId(cartItemDetails.getProduct().getId());
        return cartItemRepository.save(cartItem);
    }

    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }

    public List<CartItem> getCartItemsByCartId(Long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }
}
