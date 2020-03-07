package app.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long iComment;
    private String comment;
    private long rating;
    private long iOwner;
    private long iPost;
    private java.sql.Timestamp time;

    @ManyToOne
    @JoinColumn(name = "iPost", columnDefinition = "i_post", insertable = false, updatable = false)
    private Posts posts;
    @ManyToOne
    @JoinColumn(name = "iOwner", columnDefinition = "i_owner", insertable = false, updatable = false)
    private Users users;

    @ManyToMany
    Set<Users> usersLiked;
    @ManyToMany
    Set<Users> usersDisliked;

    public Comments() {
    }

    public Comments(String comment, long iPost, long iOwner) {
        this.comment = comment;
        this.iPost = iPost;
        this.iOwner = iOwner;
        this.time = new Timestamp(System.currentTimeMillis());
    }


    public long getI_comment() {
        return iComment;
    }

    public void setIComment(long iComment) {
        this.iComment = iComment;
    }


    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }


    public long getRating() {
        return rating;
    }

    public void setRating(long rating) {
        this.rating = rating;
    }


    public long getI_owner() {
        return iOwner;
    }

    public void setIOwner(long iOwner) {
        this.iOwner = iOwner;
    }


    public long getI_post() {
        return iPost;
    }

    public void setIPost(long iPost) {
        this.iPost = iPost;
    }


    public java.sql.Timestamp getTime() {
        return time;
    }

    public void setTime(java.sql.Timestamp time) {
        this.time = time;
    }

    public Users getUser() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Set<Users> getUsersLiked() {
        return this.usersLiked;
    }

    public Set<Users> getUsersDisliked() {
        return this.usersDisliked;
    }
}
