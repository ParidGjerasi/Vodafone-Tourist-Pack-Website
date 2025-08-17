package org.example.entity;

import java.math.BigDecimal;

public class CartItem {
    private Long productId;
    private String name;
    private BigDecimal price; // Changed from String to BigDecimal for proper calculations
    private String image;
    private int quantity;

    // Constructors
    public CartItem() {}

    public CartItem(Long productId, String name, BigDecimal price, String image, int quantity) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }

    // Alternative constructor for String price (converts to BigDecimal)
    public CartItem(Long productId, String name, String price, String image, int quantity) {
        this.productId = productId;
        this.name = name;
        this.price = new BigDecimal(price);
        this.image = image;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setPrice(String price) {
        this.price = new BigDecimal(price);
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public BigDecimal getTotalPrice() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}