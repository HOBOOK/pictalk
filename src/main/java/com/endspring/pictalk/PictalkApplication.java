package com.endspring.pictalk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@SpringBootApplication
@EnableReactiveMongoRepositories
public class PictalkApplication {

	public static void main(String[] args) {
		SpringApplication.run(PictalkApplication.class, args);
	}

}
