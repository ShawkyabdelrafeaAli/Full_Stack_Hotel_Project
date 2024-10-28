package com.codeWithProject.HotelServer.configs;

import ch.qos.logback.core.util.StringUtil;
import com.codeWithProject.HotelServer.jwt.UserService;
import com.codeWithProject.HotelServer.utill.JetUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JetUtil jetUtil;

    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Retrieve the Authorization header from the request
        final String authHeader = request.getHeader("Authorization");

        // Check if the Authorization header is null or does not start with "Bearer "
        if (StringUtils.isEmpty(authHeader) || !StringUtils.startsWith(authHeader ,"Bearer ")) {
            // If the header is missing or does not start with "Bearer", continue with the filter chain
            filterChain.doFilter(request, response);
            return; // Exit the method to prevent further execution
        }

        // Extract the JWT token by removing "Bearer " prefix
        final String jwt = authHeader.substring(7);

        // Extract the user email from the JWT token
        final String userEmail = jetUtil.extractUserName(jwt); // Assuming jwtUtil is your utility class

        // Check if userEmail is null or empty and there's no existing authentication in the SecurityContext
        if (!StringUtils.isEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from your UserDetailsService implementation
            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);

            // Validate the JWT token
            if (jetUtil.isTokenValid(jwt, userDetails)) {
                // Create an empty security context
                SecurityContext context = SecurityContextHolder.createEmptyContext();

                // Create a UsernamePasswordAuthenticationToken with user details and authorities
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );

                // Set the authentication token details
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication in the SecurityContext
                context.setAuthentication(authenticationToken);
                SecurityContextHolder.setContext(context);
            }
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}