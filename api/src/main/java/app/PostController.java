package app;

import app.domain.Posts;
import app.domain.Users;
import app.repository.CommentsRepository;
import app.repository.PostsRepository;
import app.repository.SessionidStorageRepository;
import app.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
public class PostController {
    static class AddPostRequest {
        @NotNull
        @NotBlank
        String title;
        @NotNull
        @NotBlank
        String body;
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
    }

    static class UpdatePostRequest extends AddPostRequest {
        @NotNull
        long i_post;
        public String geti_post() {
            return title;
        }
        public void setI_Post(String title) {
            this.title = title;
        }
    }

    static class DeletePostRequest {
        @NotNull
        List<Long> posts;
        public List<Long> getPosts() {
            return posts;
        }
        public void setPosts(List<Long> posts) {
            this.posts = posts;
        }
    }

    @Autowired
    PostsRepository postsRepository;
    @Autowired
    UsersRepository usersRepository;
    @Autowired
    SessionidStorageRepository sessionidStorageRepository;
    @Autowired
    CommentsRepository commentsRepository;

    @RequestMapping("/add_post")
    public Response addComment(@RequestHeader(value = "SID") String sessionId, @RequestBody @Valid AddPostRequest body) {
        Users user = AuthController.checkSID(sessionId, usersRepository, sessionidStorageRepository);
        if (user == null || !canCreatePost(user)) {
            return new Response(false);
        }
        postsRepository.save(new Posts(user.getI_user(), body.title, body.body));
        return new Response<AddPostRequest>(true).setData(body);
    }

    @RequestMapping("/update_post")
    public Response updateComment(@RequestHeader(value = "SID") String sessionId, @RequestBody @Valid UpdatePostRequest body) {
        Users user = AuthController.checkSID(sessionId, usersRepository, sessionidStorageRepository);
        if (user == null || !canCreatePost(user)) {
            return new Response(false);
        }

        Posts post = postsRepository.findById(body.i_post).get();
        if (post.getI_owner() != user.getI_user() && user.getI_user() != 1) {
            return new Response<String>(false).setData("You are not the owner of this post");
        }
        post.setTitle(body.title);
        post.setBody(body.body);
        postsRepository.save(post);
        return new Response<AddPostRequest>(true);
    }

    @RequestMapping("/posts")
    public List<Posts> getAllPosts() {
        List<Posts> posts = new ArrayList<Posts>((Collection<? extends Posts>) postsRepository.findAll());
        return posts;
    }

    @RequestMapping("/myposts")
    public Response getAllPosts(@RequestHeader(value = "SID") String sessionId) {
        Users user = AuthController.checkSID(sessionId, usersRepository, sessionidStorageRepository);
        if (user == null) {
            return new Response(false);
        }
        List<Posts> posts = new ArrayList<Posts>((Collection<? extends Posts>) postsRepository.findAll());
        posts.removeIf(
                post -> post.getI_owner() != user.getI_user()
        );
        return new Response<List<Posts>>(true).setData(posts);
    }

    @RequestMapping("/posts/{id}")
    public Posts getPostById(@PathVariable("id") long id) {
        return postsRepository.findById(id).get();
    }

    @RequestMapping("/delete_post")
    public Response deletePostById(@RequestHeader(value = "SID") String sessionId, @RequestBody @Valid DeletePostRequest body) {
        Users user = AuthController.checkSID(sessionId, usersRepository, sessionidStorageRepository);
        if (user == null) {
            return new Response(false);
        }
        List<Posts> posts = new ArrayList<Posts>((Collection<? extends Posts>) postsRepository.findAllById(body.posts));
        boolean valid = posts.stream().allMatch(posts1 -> posts1.getI_owner() == user.getI_user());
        if (!valid) {
            return new Response(false);
        }
        postsRepository.deleteAll(posts);
        return new Response(true);
    }

    @RequestMapping("/can_comment")
    public Response canComment(@RequestHeader(value = "SID") String sessionId) {
        Users user = AuthController.checkSID(sessionId, usersRepository, sessionidStorageRepository);
        return new Response(user != null && canCreatePost(user));
    }

    private boolean canCreatePost(Users user) {
        return user.getI_user() == 1 || commentsRepository.findByIOwner(user.getI_user()).size() >= 10;
    }
}
