package org.example.controller;

import org.example.entity.CartItem;
import org.example.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToCart(@RequestBody CartItem item) {
        try {
            CartItem savedItem = cartService.addToCart(item);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Item added to cart successfully");
            response.put("cartCount", cartService.getTotalItemCount());
            response.put("item", savedItem);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to add item to cart: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/items")
    public ResponseEntity<Map<String, Object>> getCartItems() {
        List<CartItem> items = cartService.getAllCartItems();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("items", items);
        response.put("totalItems", cartService.getTotalItemCount());
        response.put("uniqueProducts", cartService.getUniqueProductCount());
        response.put("totalPrice", cartService.getTotalPrice());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> getCartCount() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", cartService.getTotalItemCount());
        response.put("uniqueProducts", cartService.getUniqueProductCount());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Map<String, Object>> removeFromCart(@PathVariable Long productId) {
        boolean removed = cartService.removeFromCart(productId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", removed);
        response.put("message", removed ? "Item removed from cart" : "Item not found in cart");
        response.put("cartCount", cartService.getTotalItemCount());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<Map<String, Object>> updateQuantity(
            @PathVariable Long productId,
            @RequestBody Map<String, Integer> request) {

        int newQuantity = request.get("quantity");
        Optional<CartItem> updatedItem = cartService.updateQuantity(productId, newQuantity);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("cartCount", cartService.getTotalItemCount());

        if (updatedItem.isPresent()) {
            response.put("item", updatedItem.get());
            response.put("message", "Quantity updated successfully");
        } else {
            response.put("message", "Item removed from cart");
        }

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, Object>> clearCart() {
        cartService.clearCart();

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Cart cleared successfully");
        response.put("cartCount", 0);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getCartSummary() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("totalItems", cartService.getTotalItemCount());
        response.put("uniqueProducts", cartService.getUniqueProductCount());
        response.put("totalPrice", cartService.getTotalPrice());

        return ResponseEntity.ok(response);
    }
}