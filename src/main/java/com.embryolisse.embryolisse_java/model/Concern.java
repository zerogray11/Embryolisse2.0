package com.embryolisse.embryolisse_java.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="concerns")
public class Concern {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "concerns")
    private List<com.embryolisse.embryolisse_java.model.Product> products;

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

    public List<com.embryolisse.embryolisse_java.model.Product> getProducts() {
        return products;
    }

    public void setProducts(List<com.embryolisse.embryolisse_java.model.Product> products) {
        this.products = products;
    }
}
