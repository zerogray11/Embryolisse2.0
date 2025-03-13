package com.embryolisse.skincare.controller;

import com.embryolisse.skincare.controller.response.ProductResponse;
import com.embryolisse.skincare.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "https://embryolissemiseajour.vercel.app")
@RequestMapping("api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/skintype")
    public ResponseEntity<ProductResponse> getOneProductBySkinType(@RequestParam String skinTypeName) {
        Optional<ProductResponse> response = service.getOneProductBySkinType(skinTypeName)
                .map(ProductResponse::toResponse);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/concern")
    public ResponseEntity<ProductResponse> getOneProductByConcern(@RequestParam String concernName) {
        Optional<ProductResponse> response = service.getOneProductByConcern(concernName)
                .map(ProductResponse::toResponse);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/breakout")
    public ResponseEntity<ProductResponse> getOneProductByBreakout(@RequestParam String breakoutName) {
        Optional<ProductResponse> response = service.getOneProductByBreakout(breakoutName)
                .map(ProductResponse::toResponse);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/targetarea")
    public ResponseEntity<ProductResponse> getOneProductByTargetArea(@RequestParam String targetAreaName) {
        Optional<ProductResponse> response = service.getOneProductByTargetArea(targetAreaName)
                .map(ProductResponse::toResponse);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/forWinter/{forWinter}")
    public ResponseEntity<ProductResponse> getOneProductByForWinter(@PathVariable Boolean forWinter) {
        Optional<ProductResponse> response = service.getOneProductByForWinter(forWinter)
                .map(ProductResponse::toResponse);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/forSun/{forSun}")
    public ResponseEntity<ProductResponse> getOneProductByForSun(@PathVariable Boolean forSun) {
        Optional<ProductResponse> response = service.getOneProductByForSun(forSun)
                .map(ProductResponse::toResponse);
        return response.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
}