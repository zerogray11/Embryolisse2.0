package SysDev.skincare.service;

import SysDev.skincare.model.Breakout;
import SysDev.skincare.model.Concern;
import SysDev.skincare.model.Product;
import SysDev.skincare.model.SkinType;
import SysDev.skincare.model.TargetArea;
import SysDev.skincare.model.User;
import SysDev.skincare.model.UserResponse;
import SysDev.skincare.repository.BreakoutRepository;
import SysDev.skincare.repository.ConcernRepository;
import SysDev.skincare.repository.ProductRepository;
import SysDev.skincare.repository.SkinTypeRepository;
import SysDev.skincare.repository.TargetAreaRepository;
import SysDev.skincare.repository.UserRepository;
import SysDev.skincare.repository.UserResponseRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SkincareService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final UserResponseRepository userResponseRepository;
    private final BreakoutRepository breakoutRepository;
    private final ConcernRepository concernRepository;
    private final SkinTypeRepository skinTypeRepository;
    private final TargetAreaRepository targetAreaRepository;

    public SkincareService(ProductRepository productRepository, UserRepository userRepository,
                           UserResponseRepository userResponseRepository, BreakoutRepository breakoutRepository,
                           ConcernRepository concernRepository, SkinTypeRepository skinTypeRepository,
                           TargetAreaRepository targetAreaRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.userResponseRepository = userResponseRepository;
        this.breakoutRepository = breakoutRepository;
        this.concernRepository = concernRepository;
        this.skinTypeRepository = skinTypeRepository;
        this.targetAreaRepository = targetAreaRepository;
    }

    @Cacheable(value = "products", key = "#root.method.name")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Cacheable(value = "topProducts", key = "#root.method.name")
    public List<Product> getTopRecommendedProducts() {
        List<UserResponse> allResponses = userResponseRepository.findAll();
        Map<Product, Long> productFrequency = allResponses.stream()
                .flatMap(response -> getRecommendedProducts(response).stream())
                .collect(Collectors.groupingBy(product -> product, Collectors.counting()));

        return productFrequency.entrySet().stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .map(Map.Entry::getKey)
                .limit(5)
                .collect(Collectors.toList());
    }

    @Cacheable(value = "recommendedProducts", key = "#response.id")
    public List<Product> getRecommendedProducts(UserResponse response) {
        boolean dryInWinter = Optional.ofNullable(response.getDryInWinter()).orElse(false);
        boolean spendsTimeInSun = Optional.ofNullable(response.getSpendsTimeInSun()).orElse(false);

        return productRepository.findAll().stream()
                .filter(product -> dryInWinter && product.getForWinter() || spendsTimeInSun && product.getForSun() || product.getAntiAge())
                .limit(5)
                .collect(Collectors.toList());
    }

    @CacheEvict(value = "products", allEntries = true) // Clears the entire cache for "products"
    public UserResponse saveUserResponse(UserResponse response) {
        if (response.getUser() != null && response.getUser().getName() != null && response.getUser().getAge() != null) {
            User newUser = new User();
            newUser.setName(response.getUser().getName());
            newUser.setAge(response.getUser().getAge());
            newUser.setDryInWinter(response.getDryInWinter());
            newUser.setSpendsTimeInSun(response.getSpendsTimeInSun());
            User savedUser = userRepository.save(newUser);
            System.out.println("✅ New User Created: ID=" + savedUser.getId() + ", Name=" + savedUser.getName());
            response.setUser(savedUser);

            if (response.getBreakout() != null) {
                response.setBreakout(breakoutRepository.findById(response.getBreakout().getId())
                        .orElseThrow(() -> new IllegalArgumentException("❌ ERROR: Breakout not found")));
            }

            if (response.getConcern() != null) {
                response.setConcern(concernRepository.findById(response.getConcern().getId())
                        .orElseThrow(() -> new IllegalArgumentException("❌ ERROR: Concern not found")));
            }

            if (response.getSkinType() != null) {
                response.setSkinType(skinTypeRepository.findById(response.getSkinType().getId())
                        .orElseThrow(() -> new IllegalArgumentException("❌ ERROR: SkinType not found")));
            }

            if (response.getTargetArea() != null) {
                response.setTargetArea(targetAreaRepository.findById(response.getTargetArea().getId())
                        .orElseThrow(() -> new IllegalArgumentException("❌ ERROR: TargetArea not found")));
            }

            System.out.println("All entities are valid. Saving UserResponse...");
            return userResponseRepository.save(response);
        } else {
            throw new IllegalArgumentException("❌ ERROR: Name and Age are required to create a user");
        }
    }

    @CacheEvict(value = "topProducts", allEntries = true) // Clears the cache for top products
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = "recommendedProducts", allEntries = true) // Clears the cache for recommended products
    public void removeUserResponse(Long userResponseId) {
        userResponseRepository.deleteById(userResponseId);
    }
}
