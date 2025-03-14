package com.embryolisse.embryolisse_java.service;

import com.embryolisse.embryolisse_java.repository.ProductRepository;
import com.embryolisse.embryolisse_java.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class ProductService {
    private final ProductRepository repository;
    private static final Logger logger = Logger.getLogger(ProductService.class.getName());

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    // Method to get one product filtered by skin type
    public Optional<Product> getOneProductBySkinType(String skinTypeName) {
        if (skinTypeName == null || skinTypeName.trim().isEmpty()) {
            logger.warning("Skin type name is null or empty.");
            return Optional.empty();
        }

        List<Product> products = repository.findBySkinTypes_NameIgnoreCase(skinTypeName);
        logProductData(products);
        return products.stream().findFirst();
    }

    // Method to get one product filtered by concern
    public Optional<Product> getOneProductByConcern(String concernName) {
        if (concernName == null || concernName.trim().isEmpty()) {
            logger.warning("Concern name is null or empty.");
            return Optional.empty();
        }

        List<Product> products = repository.findByConcerns_NameIgnoreCase(concernName);
        logProductData(products);
        return products.stream().findFirst();
    }

    // Method to get one product filtered by breakout frequency
    public Optional<Product> getOneProductByBreakout(String breakoutName) {
        if (breakoutName == null || breakoutName.trim().isEmpty()) {
            logger.warning("Breakout name is null or empty.");
            return Optional.empty();
        }

        List<Product> products = repository.findByBreakouts_NameIgnoreCase(breakoutName);
        logProductData(products);
        return products.stream().findFirst();
    }

    // Method to get one product filtered by target area
    public Optional<Product> getOneProductByTargetArea(String targetAreaName) {
        if (targetAreaName == null || targetAreaName.trim().isEmpty()) {
            logger.warning("Target area name is null or empty.");
            return Optional.empty();
        }

        List<Product> products = repository.findByTargetAreas_NameIgnoreCase(targetAreaName);
        logProductData(products);
        return products.stream().findFirst();
    }

    // Method to get one product filtered by whether it is for winter
    public Optional<Product> getOneProductByForWinter(Boolean forWinter) {
        if (forWinter == null) {
            logger.warning("For winter parameter is null.");
            return Optional.empty();
        }

        List<Product> products = repository.findByForWinter(forWinter);
        logProductData(products);
        return products.stream().findFirst();
    }

    // Method to get one product filtered by whether it is for sun
    public Optional<Product> getOneProductByForSun(Boolean forSun) {
        if (forSun == null) {
            logger.warning("For sun parameter is null.");
            return Optional.empty();
        }

        List<Product> products = repository.findByForSun(forSun);
        logProductData(products);
        return products.stream().findFirst();
    }

    // Helper method to log product data for debugging
    private void logProductData(List<Product> products) {
        if (products == null || products.isEmpty()) {
            logger.info("No products found or products list is null.");
        } else {
            for (Product product : products) {
                logger.info("Product ID: " + (product.getId() != null ? product.getId() : "null"));
                logger.info("Product Name: " + (product.getName() != null ? product.getName() : "null"));
                logger.info("Image URL Length: " + (product.getImageUrl() != null ? product.getImageUrl().length() : "null"));

            }
        }
    }
}