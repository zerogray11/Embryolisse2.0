package com.embryolisse.skincare.controller;

import com.embryolisse.skincare.controller.response.ProductResponse;
import com.embryolisse.skincare.model.Product;
import com.embryolisse.skincare.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173") //This is really important to tell it how to connect to REACT Front-end
@RequestMapping("api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(
                service.findAllProducts()
                        .stream()
                        .map(ProductResponse::toResponse)
                        .toList()
        );
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long productId){
        return ResponseEntity.ok(
                service.findProductByProductId(productId)
                        .map(ProductResponse::toResponse)
                        .orElse(null)
        );
    }

    //Test this with GET http://localhost:8080/api/products/skintype?skinTypeName=oily
    @GetMapping("/skintype")
    public List<ProductResponse> getProductsBySkinType(@RequestParam String skinTypeName) {
        List<Product> products = service.getProductsBySkinType(skinTypeName);
        return products.stream()
                .map(ProductResponse::toResponse)
                .collect(Collectors.toList());
    }

    // Test this with GET http://localhost:8080/api/products/concern?concernName=wrinkles
    @GetMapping("/concern")
    public List<ProductResponse> getProductsByConcern(@RequestParam String concernName) {
        List<Product> products = service.getProductsByConcern(concernName);
        return products.stream()
                .map(ProductResponse::toResponse)
                .collect(Collectors.toList());
    }

    // Test this with GET http://localhost:8080/api/products/breakout?breakoutName=frequently
    @GetMapping("/breakout")
    public List<ProductResponse> getProductsByBreakout(@RequestParam String breakoutName) {
        List<Product> products = service.getProductsByBreakout(breakoutName);
        return products.stream()
                .map(ProductResponse::toResponse)
                .collect(Collectors.toList());
    }

    // Test this with GET http://localhost:8080/api/products/targetarea?targetAreaName=eyes
    @GetMapping("/targetarea")
    public List<ProductResponse> getProductsByTargetArea(@RequestParam String targetAreaName) {
        List<Product> products = service.getProductsByTargetArea(targetAreaName);
        return products.stream()
                .map(ProductResponse::toResponse)
                .collect(Collectors.toList());
    }

    // Test this with GET http://localhost:8080/api/products/forWinter/true
    @GetMapping("/forWinter/{forWinter}")
    public List<ProductResponse> getProductsByForWinter(@PathVariable Boolean forWinter) {
        List<Product> products = service.getProductsByForWinter(forWinter);

        return products.stream()
                .map(ProductResponse::toResponse)
                .collect(Collectors.toList());
    }


    // Test this with GET http://localhost:8080/api/products/forSun/true
    @GetMapping("/forSun/{forSun}")
    public List<ProductResponse> getProductsByForSun(@PathVariable Boolean forSun) {
        List<Product> products = service.getProductsByForSun(forSun);

        return products.stream()
                .map(ProductResponse::toResponse)
                .collect(Collectors.toList());
    }
}
