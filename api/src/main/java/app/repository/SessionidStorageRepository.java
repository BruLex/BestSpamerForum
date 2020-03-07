package app.repository;

import app.domain.Sessionidstorage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
public interface SessionidStorageRepository extends CrudRepository<Sessionidstorage, Long> {
    List<Sessionidstorage> findBySessionId(String sessionID);

    @Override
    <S extends Sessionidstorage> S save(S entity);

    @Override
    void deleteById(Long aLong);

}
