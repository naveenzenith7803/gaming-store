package com.gamezone.Backend.Controller;

import com.gamezone.Backend.Entity.CartItem;
import com.gamezone.Backend.Service.CartItemService;
import com.gamezone.Backend.dto.CartItemDTO;
import com.gamezone.Backend.mapper.CartItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping
    public List<CartItemDTO> getAllCartItems() {
        List<CartItem> cartItems = cartItemService.getAllCartItems();
        return cartItems.stream()
                .map(CartItemMapper::toCartItemDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItemDTO> getCartItemById(@PathVariable Long id) {
        Optional<CartItem> cartItem = cartItemService.getCartItemById(id);
        return cartItem.map(c -> ResponseEntity.ok(CartItemMapper.toCartItemDTO(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/cart/{cartId}")
    public ResponseEntity<List<CartItemDTO>> getCartItemsByCartId(@PathVariable Long cartId) {
        List<CartItem> cartItems = cartItemService.getCartItemsByCartId(cartId);
        List<CartItemDTO> cartItemDTOs = cartItems.stream()
                .map(CartItemMapper::toCartItemDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(cartItemDTOs);
    }

    @PostMapping
    public CartItemDTO createCartItem(@RequestBody CartItemDTO cartItemDTO) {
        System.out.println(cartItemDTO.getCartId());
        System.out.println(cartItemDTO.getProductId());
        System.out.println(cartItemDTO.getQuantity());
        CartItem cartItem = CartItemMapper.toCartItem(cartItemDTO);
        CartItem createdCartItem = cartItemService.createCartItem(cartItem);
        return CartItemMapper.toCartItemDTO(createdCartItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItemDTO> updateCartItem(@PathVariable Long id, @RequestBody CartItemDTO cartItemDTO) {
        try {
            CartItem cartItem = CartItemMapper.toCartItem(cartItemDTO);
            cartItem.setId(id); // Ensure we set the ID for the update
            CartItem updatedCartItem = cartItemService.updateCartItem(id, cartItem);
            return ResponseEntity.ok(CartItemMapper.toCartItemDTO(updatedCartItem));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
}

