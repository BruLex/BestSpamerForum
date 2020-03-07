package app.repository;

import app.domain.Restrictedwords;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@RepositoryRestResource()
public interface RestrictedWordsRepository extends PagingAndSortingRepository<Restrictedwords, Long> {
    @Override
    List<Restrictedwords> findAll(Sort sort);
}
