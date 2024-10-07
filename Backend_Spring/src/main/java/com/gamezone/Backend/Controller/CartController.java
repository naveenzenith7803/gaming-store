package com.gamezone.Backend.Controller;

import com.gamezone.Backend.Entity.Cart;
import com.gamezone.Backend.Service.CartService;
import com.gamezone.Backend.dto.CartDTO;
import com.gamezone.Backend.mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<CartDTO> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return carts.stream()
                .map(CartMapper::toCartDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartDTO> getCartById(@PathVariable Long id) {
        Optional<Cart> cart = cartService.getCartById(id);
        return cart.map(c -> ResponseEntity.ok(CartMapper.toCartDTO(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CartDTO createCart(@RequestBody CartDTO cartDTO) {
        Cart cart = CartMapper.toCart(cartDTO);
        Cart createdCart = cartService.createCart(cart);
        return CartMapper.toCartDTO(createdCart);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartDTO> updateCart(@PathVariable Long id, @RequestBody CartDTO cartDTO) {
        try {
            Cart cart = CartMapper.toCart(cartDTO);
            cart.setId(id); // Ensure we set the ID for the update
            Cart updatedCart = cartService.updateCart(id, cart);
            return ResponseEntity.ok(CartMapper.toCartDTO(updatedCart));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }
}

