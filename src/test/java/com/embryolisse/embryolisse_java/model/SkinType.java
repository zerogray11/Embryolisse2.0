package com.embryolisse.embryolisse_java.model;

import jakarta.persistence.*;
import com.embryolisse.embryolisse_java.model.Product;
import java.util.List;

@Entity
@Table(name="skin_types")
public class SkinType {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "skinTypes")
    private List<Product> products;

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

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
