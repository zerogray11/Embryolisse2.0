package com.embryolisse.skincare.repository;

import com.embryolisse.skincare.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find products by skin type
    List<Product> findBySkinTypes_NameIgnoreCase(String skinTypeName);

    // Find products by concern
    List<Product> findByConcerns_NameIgnoreCase(String concernName);

    // Find products by breakout frequency
    List<Product> findByBreakouts_NameIgnoreCase(String breakoutName);

    // Find products by the target area
    List<Product> findByTargetAreas_NameIgnoreCase(String targetAreaName);

    // Find products for winter
    List<Product> findByForWinter(Boolean forWinter);

    // Find products for sun
    List<Product> findByForSun(Boolean forSun);
}
