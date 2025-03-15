package SysDev.skincare.repository;

import SysDev.skincare.model.Breakout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BreakoutRepository extends JpaRepository<Breakout, Long> {
}