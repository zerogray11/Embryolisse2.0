package SysDev.skincare.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer age;
    private Boolean dryInWinter;
    private Boolean spendsTimeInSun;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean getDryInWinter() {
        return dryInWinter;
    }

    public void setDryInWinter(Boolean dryInWinter) {
        this.dryInWinter = dryInWinter;
    }

    public Boolean getSpendsTimeInSun() {
        return spendsTimeInSun;
    }

    public void setSpendsTimeInSun(Boolean spendsTimeInSun) {
        this.spendsTimeInSun = spendsTimeInSun;
    }
}
