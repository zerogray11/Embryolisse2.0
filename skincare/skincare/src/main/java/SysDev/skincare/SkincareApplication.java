package SysDev.skincare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SkincareApplication {
	public static void main(String[] args) {
		SpringApplication.run(SkincareApplication.class, args);
	}
}
