package app.repository;

import app.domain.Comments;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "comments", path = "comments")
@CrossOrigin(origins = "http://localhost:4200")
public interface CommentsRepository extends PagingAndSortingRepository<Comments, Long> {
    @Override
    List<Comments> findAll(Sort sort);

    List<Comments> findByIPost(Sort sort);

    List<Comments> findByIOwner(long iOwner);

    List<Comments> findByIComment(long iComment);

}
