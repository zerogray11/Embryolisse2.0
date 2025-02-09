package com.embryolisse.skincare.model;

import jakarta.persistence.*;


import java.util.List;

@Entity
@Table(name="products")
public class Product {

    @Id
    @GeneratedValue
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
    private String imageUrl;

    // Many-to-many relationship to SkinType
    @ManyToMany
    @JoinTable(
            name = "product_skin_types",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "skin_type_id")
    )
    private List<SkinType> skinTypes;

    // Many-to-many relationship to Concern
    @ManyToMany
    @JoinTable(
            name = "product_concerns",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "concern_id")
    )
    private List<Concern> concerns;

    // Many-to-many relationship to Breakout
    @ManyToMany
    @JoinTable(
            name = "product_breakouts",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "breakout_id")
    )
    private List<Breakout> breakouts;

    // Many-to-many relationship to TargetArea
    @ManyToMany
    @JoinTable(
            name = "product_target_areas",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "target_area_id")
    )
    private List<TargetArea> targetAreas;

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
}
