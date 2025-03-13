package com.embryolisse.skincare.repository;

import com.embryolisse.skincare.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    // Find products by skin type, concern, target area, winter, sun
    @Query("SELECT DISTINCT p FROM Product p " +
            "WHERE (:skinType IS NULL OR EXISTS (SELECT 1 FROM p.skinTypes st WHERE st.name = :skinType)) " +
            "AND (:concern IS NULL OR EXISTS (SELECT 1 FROM p.concerns c WHERE c.name = :concern)) " +
            "AND (:breakout IS NULL OR EXISTS (SELECT 1 FROM p.breakouts b WHERE b.name = :breakout)) " +
            "AND (:targetArea IS NULL OR EXISTS (SELECT 1 FROM p.targetAreas ta WHERE ta.name = :targetArea)) " +
            "AND (:forWinter IS NULL OR p.forWinter = :forWinter) " +
            "AND (:forSun IS NULL OR p.forSun = :forSun)")
    List<Product> findFilteredProducts(
            @Param("skinType") String skinType,
            @Param("concern") String concern,
            @Param("breakout") String breakout,
            @Param("targetArea") String targetArea,
            @Param("forWinter") Boolean forWinter,
            @Param("forSun") Boolean forSun
    );
}