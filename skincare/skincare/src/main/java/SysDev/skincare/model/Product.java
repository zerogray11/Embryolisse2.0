package SysDev.skincare.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean forWinter;
    private Boolean forSun;
    private Boolean antiAge;

    @ManyToMany
    @JoinTable(
            name = "product_skin_types",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "skin_type_id"))
    private Set<SkinType> skinTypes;

    @ManyToMany
    @JoinTable(
            name = "product_concerns",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "concern_id"))
    private Set<Concern> concerns;

    @ManyToMany
    @JoinTable(
            name = "product_breakouts",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "breakout_id"))
    private Set<Breakout> breakouts;

    @ManyToMany
    @JoinTable(
            name = "product_target_areas",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "target_area_id"))
    private Set<TargetArea> targetAreas;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Set<SkinType> getSkinTypes() {
        return skinTypes;
    }

    public void setSkinTypes(Set<SkinType> skinTypes) {
        this.skinTypes = skinTypes;
    }

    public Set<Concern> getConcerns() {
        return concerns;
    }

    public void setConcerns(Set<Concern> concerns) {
        this.concerns = concerns;
    }

    public Set<Breakout> getBreakouts() {
        return breakouts;
    }

    public void setBreakouts(Set<Breakout> breakouts) {
        this.breakouts = breakouts;
    }

    public Set<TargetArea> getTargetAreas() {
        return targetAreas;
    }

    public void setTargetAreas(Set<TargetArea> targetAreas) {
        this.targetAreas = targetAreas;
    }
}