package com.embryolisse.skincare.controller.response;

import com.embryolisse.skincare.model.Product;

public class ProductResponse {

    private Long productId;
    private String name;
    private String description;

    public ProductResponse() {
    }

    public ProductResponse(Long productId, String name, String description) {
        this.productId = productId;
        this.name = name;
        this.description = description;
    }

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

    public static ProductResponse toResponse(Product product) {
        return new ProductResponse(product.getId(), product.getName(),
                product.getDescription());
    }

}
