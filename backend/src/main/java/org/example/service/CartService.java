package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.entity.CartItem;
import org.example.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {


    private final CartRepository cartRepository;

    public CartItem addToCart(CartItem item) {
        Optional<CartItem> existingItem = cartRepository.findByProductId(item.getProductId());

        if (existingItem.isPresent()) {
            // Update quantity if item already exists
            CartItem existing = existingItem.get();
            existing.setQuantity(existing.getQuantity() + item.getQuantity());
            return cartRepository.save(existing);
        } else {
            // Add new item
            return cartRepository.save(item);
        }
    }

    public List<CartItem> getAllCartItems() {
        return cartRepository.findAll();
    }

    public boolean removeFromCart(Long productId) {
        return cartRepository.deleteByProductId(productId);
    }

    public Optional<CartItem> updateQuantity(Long productId, int quantity) {
        if (quantity <= 0) {
            cartRepository.deleteByProductId(productId);
            return Optional.empty();
        }
        return cartRepository.updateQuantity(productId, quantity);
    }

    public void clearCart() {
        cartRepository.deleteAll();
    }

    public int getTotalItemCount() {
        return cartRepository.getTotalItemCount();
    }

    public int getUniqueProductCount() {
        return cartRepository.getUniqueProductCount();
    }

    public BigDecimal getTotalPrice() {
        return cartRepository.findAll().stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}