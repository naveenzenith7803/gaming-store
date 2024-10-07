package com.gamezone.Backend.Controller;

import com.gamezone.Backend.Entity.OrderItem;
import com.gamezone.Backend.Service.OrderItemService;
import com.gamezone.Backend.dto.OrderItemDTO;
import com.gamezone.Backend.mapper.OrderItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @GetMapping
    public List<OrderItemDTO> getAllOrderItems() {
        List<OrderItem> orderItems = orderItemService.getAllOrderItems();
        return orderItems.stream()
                .map(OrderItemMapper::toOrderItemDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderItemDTO> getOrderItemById(@PathVariable Long id) {
        Optional<OrderItem> orderItem = orderItemService.getOrderItemById(id);
        return orderItem.map(o -> ResponseEntity.ok(OrderItemMapper.toOrderItemDTO(o)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public OrderItemDTO createOrderItem(@RequestBody OrderItemDTO orderItemDTO) {
        OrderItem orderItem = OrderItemMapper.toOrderItem(orderItemDTO);
        OrderItem createdOrderItem = orderItemService.createOrderItem(orderItem);
        return OrderItemMapper.toOrderItemDTO(createdOrderItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderItemDTO> updateOrderItem(@PathVariable Long id, @RequestBody OrderItemDTO orderItemDTO) {
        try {
            OrderItem orderItem = OrderItemMapper.toOrderItem(orderItemDTO);
            orderItem.setId(id); // Ensure we set the ID for the update
            OrderItem updatedOrderItem = orderItemService.updateOrderItem(id, orderItem);
            return ResponseEntity.ok(OrderItemMapper.toOrderItemDTO(updatedOrderItem));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
        return ResponseEntity.noContent().build();
    }
}

