package com.embryolisse.embryolisse_java.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @Column(name = "for_winter")
    private Boolean forWinter;

    @Column(name = "for_sun")
    private Boolean forSun;

    @Column(name = "anti_age")
    private Boolean antiAge;

    @Column(name = "image_url")
    private String imageUrl; // Base64-encoded string

    // Many-to-many relationships
    @ManyToMany
    @JoinTable(
            name = "product_skin_types",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "skin_type_id")
    )
    private List<SkinType> skinTypes;

    @ManyToMany
    @JoinTable(
            name = "product_concerns",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "concern_id")
    )
    private List<Concern> concerns;

    @ManyToMany
    @JoinTable(
            name = "product_breakouts",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "breakout_id")
    )
    private List<Breakout> breakouts;

    @ManyToMany
    @JoinTable(
            name = "product_target_areas",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "target_area_id")
    )
    private List<TargetArea> targetAreas;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Boolean getForWinter() {
        return forWinter;
    }

    public void setForWinter(Boolean forWinter) {
        this.forWinter = forWinter;
    }

    public Boolean getForSun() {
        return forSun;
    }

    public void setForSun(Boolean forSun) {
        this.forSun = forSun;
    }

    public Boolean getAntiAge() {
        return antiAge;
    }

    public void setAntiAge(Boolean antiAge) {
        this.antiAge = antiAge;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<SkinType> getSkinTypes() {
        return skinTypes;
    }

    public void setSkinTypes(List<SkinType> skinTypes) {
        this.skinTypes = skinTypes;
    }

    public List<Concern> getConcerns() {
        return concerns;
    }

    public void setConcerns(List<Concern> concerns) {
        this.concerns = concerns;
    }

    public List<Breakout> getBreakouts() {
        return breakouts;
    }

    public void setBreakouts(List<Breakout> breakouts) {
        this.breakouts = breakouts;
    }

    public List<TargetArea> getTargetAreas() {
        return targetAreas;
    }

    public void setTargetAreas(List<TargetArea> targetAreas) {
        this.targetAreas = targetAreas;
    }
}