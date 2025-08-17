package org.example.repository;

import org.example.entity.CartItem;
import org.springframework.stereotype.Repository;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;


@Repository
public class CartRepository {

    // Using ConcurrentHashMap for thread safety
    private final Map<Long, CartItem> cartItems = new ConcurrentHashMap<>();

    /**
     * Add or update a cart item
     */
    public CartItem save(CartItem item) {
        cartItems.put(item.getProductId(), item);
        return item;
    }

    /**
     * Find all cart items
     */
    public List<CartItem> findAll() {
        return new ArrayList<>(cartItems.values());
    }

    /**
     * Find cart item by product ID
     */
    public Optional<CartItem> findByProductId(Long productId) {
        return Optional.ofNullable(cartItems.get(productId));
    }

    /**
     * Delete cart item by product ID
     */
    public boolean deleteByProductId(Long productId) {
        return cartItems.remove(productId) != null;
    }

    /**
     * Clear all cart items
     */
    public void deleteAll() {
        cartItems.clear();
    }

    /**
     * Check if cart item exists
     */
    public boolean existsByProductId(Long productId) {
        return cartItems.containsKey(productId);
    }

    /**
     * Get total count of items in cart
     */
    public int getTotalItemCount() {
        return cartItems.values().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
    }

    /**
     * Get count of unique products in cart
     */
    public int getUniqueProductCount() {
        return cartItems.size();
    }

    /**
     * Update quantity of existing item
     */
    public Optional<CartItem> updateQuantity(Long productId, int quantity) {
        CartItem item = cartItems.get(productId);
        if (item != null) {
            item.setQuantity(quantity);
            return Optional.of(item);
        }
        return Optional.empty();
    }
}