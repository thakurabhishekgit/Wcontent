package com.backend.Wcontent.config;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final String[] allowedOrigins = {
            "http://localhost:5173",
            "https://wcontent-app.vercel.app",
            "http://localhost:9002",
            "https://6000-idx-studio-1746278215655.cluster-73qgvk7hjjadkrjeyexca5ivva.cloudworkstations.dev",
            "https://wcontent-app-in.vercel.app"
    };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @PostConstruct
    public void printAllowedOrigins() {
        System.out.println("Allowed CORS origins configured:");
        for (String origin : allowedOrigins) {
            System.out.println(" - " + origin);
        }
    }

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @PostConstruct
    public void printMongoUri() {
        String maskedUri = mongoUri.replaceAll(":(.*?)@", ":****@");
        System.out.println("✅ Connected to MongoDB: " + maskedUri);
    }
}
