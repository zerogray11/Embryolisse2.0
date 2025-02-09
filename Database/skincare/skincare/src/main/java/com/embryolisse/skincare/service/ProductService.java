package com.embryolisse.skincare.service;

import com.embryolisse.skincare.model.Product;
import com.embryolisse.skincare.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository repository;

    private final static String PRODUCT_NOT_FOUND="Product not found";

    public ProductService(ProductRepository repository) {this.repository = repository; }

    public List<Product> findAllProducts() {return repository.findAll(); }

    public Optional<Product> findProductByProductId(Long productId) {
        return repository.findById(productId);
    }

    // Method to get products filtered by their skin type
    public List<Product> getProductsBySkinType(String skinTypeName) {
        return repository.findBySkinTypes_NameIgnoreCase(skinTypeName);
    }

    // Method to get products filtered by their skin type
    public List<Product> getProductsByConcern(String concernName) {
        return repository.findByConcerns_NameIgnoreCase(concernName);
    }

    // Method to get products filtered by whether they are for winter
    public List<Product> getProductsByForWinter(Boolean forWinter) {
        return repository.findByForWinter(forWinter);
    }

    // Method to get products filtered by breakout frequency
    public List<Product> getProductsByBreakout(String breakoutName) {
        return repository.findByBreakouts_NameIgnoreCase(breakoutName);
    }

    // Method to get products filtered by breakout frequency
    public List<Product> getProductsByTargetArea(String targetAreaName) {
        return repository.findByTargetAreas_NameIgnoreCase(targetAreaName);
    }

    // Method to get products filtered by whether they are for sun damage
    public List<Product> getProductsByForSun(Boolean forSun) {
        return repository.findByForSun(forSun);
    }
}
