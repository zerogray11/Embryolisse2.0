package SysDev.skincare.repository;

import SysDev.skincare.model.Product;
import SysDev.skincare.model.SkinType;
import SysDev.skincare.model.Concern;
import SysDev.skincare.model.Breakout;
import SysDev.skincare.model.TargetArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySkinTypes(SkinType skinType);
    List<Product> findByConcerns(Concern concern);
    List<Product> findByBreakouts(Breakout breakout);
    List<Product> findByTargetAreas(TargetArea targetArea);
}
