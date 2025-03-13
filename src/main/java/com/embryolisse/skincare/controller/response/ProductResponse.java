package com.embryolisse.skincare.controller.response;

import com.embryolisse.skincare.model.Product;

public class ProductResponse {

    private Long productId;
    private String name;
    private String description;
    private String imageUrl; // Base64-encoded string or null

    // Default constructor
    public ProductResponse() {
        this.productId = null;
        this.name = null;
        this.description = null;
        this.imageUrl = null;
    }

    // Constructor with all fields
    public ProductResponse(Long productId, String name, String description, String imageUrl) {
        this.productId = productId;
        this.name = name != null ? name : "Unknown Product";
        this.description = description != null ? description : "No description available.";
        this.imageUrl = imageUrl; // Can be null
    }

    // Static method to convert Product to ProductResponse
    public static ProductResponse toResponse(Product product) {
        if (product == null) {
            return new ProductResponse(null, null, null, null);
        }
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImageUrl() // Directly pass the Base64 string
        );
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
        this.name = name != null ? name : "Unknown Product";
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description != null ? description : "No description available.";
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl; // Can be null
    }
}