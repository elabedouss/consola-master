package com.consola.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("com.consola.model")
@ComponentScan(basePackages = "com.consola")
@EnableJpaRepositories("com.consola.repositories")
@SpringBootApplication
public class Consola {

	public static void main(String[] args) {
		SpringApplication.run(Consola.class, args);
	}

}