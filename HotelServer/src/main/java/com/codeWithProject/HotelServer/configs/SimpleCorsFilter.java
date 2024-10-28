package com.codeWithProject.HotelServer.configs;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;
import java.net.http.HttpClient;
import java.util.logging.LogRecord;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleCorsFilter implements Filter {

//    @Bean
//    public WebMvcConfigurer getCorsConfiguration() {
//        return new WebMvcConfigurer() {

//            @Override
//            public void addCorsMappings(CorsRegistry register) {
//                register.addMapping("/**")
//                        .allowedOrigins("http://localhost:4200")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE")
//                        .allowedHeaders("*");
//            }
//        };


    //  }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletResponse response =  (HttpServletResponse)  servletResponse;
        HttpServletRequest request = (HttpServletRequest)  servletRequest;
        String originHeader = request.getHeader("origin");
        response.setHeader("Access-Control-Allow-Origin",originHeader);
        response.setHeader("Access-Control-Allow-METHODS","POST,GET,PUT,OPTIONS ,DELETE");
        response.setHeader("Access-Control-Max-Age","3600");
        response.setHeader("Access-Control-Allow-Headers","*");

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())){
            response.setStatus(HttpServletResponse.SC_OK);
        }else {
            filterChain.doFilter(servletRequest,servletResponse);
        }
    }
    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}