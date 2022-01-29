package com.consola.configuration;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.consola.mail.ConsolaMailSender;
import com.consola.mail.MailBuilder;

@Configuration
public class AppConf implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE");
	}

	@Bean
	public ConsolaMailSender consolaMailSender() {
		return new ConsolaMailSender();
	}
	
	@Bean
	public MailBuilder mailBuilder() {
		return new MailBuilder();
	}

	@Bean(name="messageSourceMail")
	public MessageSource messageSourceMail() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasenames("messages");
		messageSource.setDefaultEncoding("UTF-8");
		messageSource.setUseCodeAsDefaultMessage(true);
		return messageSource;
	}
}