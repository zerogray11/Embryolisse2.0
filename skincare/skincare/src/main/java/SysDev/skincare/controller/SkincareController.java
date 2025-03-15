package SysDev.skincare.controller;

import SysDev.skincare.model.*;
import SysDev.skincare.service.SkincareService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skincare")
public class SkincareController {

    private final SkincareService skincareService;

    // Constructor injection for SkincareService
    public SkincareController(SkincareService skincareService) {
        this.skincareService = skincareService;
    }

    // Endpoint to get all products
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return skincareService.getAllProducts();
    }

    // Endpoint to save user response
    @PostMapping("/user-response")
    public UserResponse saveUserResponse(@RequestBody UserResponse response) {
        return skincareService.saveUserResponse(response);
    }

    // Endpoint to get recommended products based on user input (caching applied)
    @GetMapping("/recommended-products")
    @Cacheable("recommended-products")
    public List<Product> getRecommendedProducts() {
        return skincareService.getTopRecommendedProducts();
    }

    // Endpoint to retrieve the top recommended products
    @GetMapping("/top-recommended-products")
    @Cacheable("top-recommended-products")
    public List<Product> getTopRecommendedProducts() {
        return skincareService.getTopRecommendedProducts();
    }
}

