package com.diagnosis.cardoctor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class CardoctorApplication {

	public static void main(String[] args) {
		SpringApplication.run(CardoctorApplication.class, args);
		System.out.println("WORKS!");
	}

	@GetMapping("/")
	public String apiRoot() {
		return "Hello World!";
	}

	@GetMapping("/igen")
	public String igen() {
		return "This is the main back end!";
	}

}
