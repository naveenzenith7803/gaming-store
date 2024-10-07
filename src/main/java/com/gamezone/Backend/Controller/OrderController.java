package com.gamezone.Backend.Controller;

import com.gamezone.Backend.Entity.Order;
import com.gamezone.Backend.Service.OrderService;
import com.gamezone.Backend.dto.OrderDTO;
import com.gamezone.Backend.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return orders.stream()
                .map(OrderMapper::toOrderDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(o -> ResponseEntity.ok(OrderMapper.toOrderDTO(o)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        Order order = OrderMapper.toOrder(orderDTO);
        Order createdOrder = orderService.createOrder(order);
        return OrderMapper.toOrderDTO(createdOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        try {
            Order order = OrderMapper.toOrder(orderDTO);
            order.setId(id); // Ensure we set the ID for the update
            Order updatedOrder = orderService.updateOrder(id, order);
            return ResponseEntity.ok(OrderMapper.toOrderDTO(updatedOrder));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}

