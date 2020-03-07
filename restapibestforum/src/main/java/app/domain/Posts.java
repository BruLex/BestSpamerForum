package app.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long iPost;
    private long iOwner;
    private String title;
    private String body;

    @OneToMany(mappedBy = "posts", cascade = CascadeType.ALL)
    List<Comments> comments;
    @ManyToOne
    @JoinColumn(name = "iOwner", columnDefinition = "i_owner", insertable = false, updatable = false)
    private Users users;

    public Posts() {
    }

    public Posts(long iOwner, String title, String body) {
        this.iOwner = iOwner;
        this.title = title;
        this.body = body;
    }


    public long getI_post() {
        return iPost;
    }

    public void setIPost(long iPost) {
        this.iPost = iPost;
    }


    public long getI_owner() {
        return iOwner;
    }

    public void setIOwner(long iOwner) {
        this.iOwner = iOwner;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }


    public List<Comments> getComments() {
        comments.sort((a, b) -> b.getTime().compareTo(a.getTime()));
        return comments;
    }

    public void setComments(List<Comments> comments) {
        this.comments = comments;
    }

    public Users getUser() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
