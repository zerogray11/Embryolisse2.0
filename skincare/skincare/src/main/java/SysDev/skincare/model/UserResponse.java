package SysDev.skincare.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_responses")
public class UserResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "skin_type_id")
    private SkinType skinType;

    @ManyToOne
    @JoinColumn(name = "breakout_id")
    private Breakout breakout;

    @ManyToOne
    @JoinColumn(name = "concern_id")
    private Concern concern;

    @ManyToOne
    @JoinColumn(name = "target_area_id")
    private TargetArea targetArea;

    private Boolean dryInWinter;
    private Boolean spendsTimeInSun;

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SkinType getSkinType() {
        return skinType;
    }

    public void setSkinType(SkinType skinType) {
        this.skinType = skinType;
    }

    public Concern getConcern() {
        return concern;
    }

    public void setConcern(Concern concern) {
        this.concern = concern;
    }

    public Breakout getBreakout() {
        return breakout;
    }

    public void setBreakout(Breakout breakout) {
        this.breakout = breakout;
    }

    public TargetArea getTargetArea() {
        return targetArea;
    }

    public void setTargetArea(TargetArea targetArea) {
        this.targetArea = targetArea;
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
