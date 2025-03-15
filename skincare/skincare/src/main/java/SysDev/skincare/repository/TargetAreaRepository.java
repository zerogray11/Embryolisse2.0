package SysDev.skincare.repository;

import SysDev.skincare.model.TargetArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TargetAreaRepository extends JpaRepository<TargetArea, Long> {
}
