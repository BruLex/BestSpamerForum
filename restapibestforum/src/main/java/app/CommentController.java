package app;

import app.domain.Comments;
import app.domain.Posts;
import app.domain.Restrictedwords;
import app.domain.Users;
import app.repository.CommentsRepository;
import app.repository.RestrictedWordsRepository;
import app.repository.SessionidStorageRepository;
import app.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
public class CommentController {
    static class AddCommentRequest {
        @NotNull
        @NotBlank
        String comment;
        @NotNull
        long i_post;
        public String getComment() {
            return comment;
        }
        public void setComment(String comment) {
            this.comment = comment;
        }
        public long getI_post() {
            return i_post;
        }
        public void setI_post(long i_post) {
            this.i_post = i_post;
        }
    }

    @Autowired
    UsersRepository usersRepository;
    @Autowired
    SessionidStorageRepository sessionidStorageRepository;
    @Autowired
    CommentsRepository commentsRepository;
    @Autowired
    RestrictedWordsRepository restrictedWordsRepository;

    @RequestMapping("/add_comment")
    public Response addComment(@RequestHeader(value = "SID") String sessionId, @RequestBody @Valid AddCommentRequest body) {
        Users user = AuthController.checkSID(sessionId, usersRepository, sessionidStorageRepository);
        if (user == null) {
            return new Response(false);
        }
        commentsRepository.save(new Comments(body.comment, body.i_post, user.getI_user()));
        return new Response<String>(true).setData(body.comment);
    }

    static class ChangeRating {
        @NotNull
        long i_comment;
        @NotNull
        boolean liked;
        public long getI_comment() {
            return i_comment;
        }
        public void setI_comment(long i_comment) {
            this.i_comment = i_comment;
        }
        public boolean isLiked() {
            return liked;
        }
        public void setLiked(boolean liked) {
            this.liked = liked;
        }
    }

    @RequestMapping("/change_rating")
    public Response changeRating(@RequestHeader(value = "SID") String sessionId, @RequestBody @Valid ChangeRating body) {
        Users user = AuthController.checkSID(sessionId, usersRepository, sessionidStorageRepository);
        if (user == null) {
            return new Response(false);
        }
        System.out.println("icomment " + body.i_comment);
        Comments comment = commentsRepository.findById(body.i_comment).get();
        if (body.liked) {
            if (!comment.getUsersLiked().contains(user)) {
                comment.setRating(comment.getRating() + 1);
                user.setCarma(user.getCarma() + 1);
            }
            comment.getUsersDisliked().remove(user);
            comment.getUsersLiked().add(user);
        } else {
            if (!comment.getUsersDisliked().contains(user)) {
                comment.setRating(comment.getRating() - 1);
                user.setCarma(user.getCarma() - 1);
            }
            comment.getUsersLiked().remove(user);
            comment.getUsersDisliked().add(user);
        }
        commentsRepository.save(comment);
        usersRepository.save(user);
        return new Response(true);
    }

    @RequestMapping("/restrictedwords")
    public List<Restrictedwords> getRestrictedWords() {
        List<Restrictedwords> restrictedwords =new ArrayList<Restrictedwords>(
                (Collection<? extends Restrictedwords>) restrictedWordsRepository.findAll()
        );
        return restrictedwords;
    }

}
