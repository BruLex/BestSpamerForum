package app.repository;

import app.domain.Posts;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "posts", path = "posts")
public interface PostsRepository extends PagingAndSortingRepository<Posts, Long> {
    @Override
    List<Posts> findAll(Sort sort);
}
