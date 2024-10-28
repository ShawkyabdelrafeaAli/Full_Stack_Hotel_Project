package com.codeWithProject.HotelServer.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
@EnableWebMvc
public class Config implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**") // Allow all endpoints
                    .allowedOrigins("http://localhost:4200") // Allow the frontend origin
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow the required HTTP methods
                    .allowedHeaders("*") // Allow any headers
                    .allowedHeaders("Content-Type", "Authorization","Accept", "X-Requested-With")
                    .allowCredentials(true) // Allow cookies and credentials
                    .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials");
        }


}
