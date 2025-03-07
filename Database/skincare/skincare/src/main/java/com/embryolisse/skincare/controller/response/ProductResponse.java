package com.embryolisse.skincare.controller.response;

import com.embryolisse.skincare.model.Product;

public class ProductResponse {

    private Long productId;
    private String name;
    private String description;
    private String imageUrl;

    // Default constructor
    public ProductResponse() {}

    // Constructor with all fields
    public ProductResponse(Long productId, String name, String description, String imageUrl) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // Static method to convert Product to ProductResponse
    public static ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImageUrl()
        );
    }
}
