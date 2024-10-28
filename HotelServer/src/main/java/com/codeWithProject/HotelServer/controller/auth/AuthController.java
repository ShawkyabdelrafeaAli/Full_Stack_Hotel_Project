package com.codeWithProject.HotelServer.controller.auth;

import com.codeWithProject.HotelServer.dto.*;
import com.codeWithProject.HotelServer.entity.User;
import com.codeWithProject.HotelServer.excpetion.NotFoundException;
import com.codeWithProject.HotelServer.jwt.UserService;
import com.codeWithProject.HotelServer.repository.UserRepository;
import com.codeWithProject.HotelServer.services.auth.AuthService;

import com.codeWithProject.HotelServer.services.auth.admin.rooms.RoomsService;
import com.codeWithProject.HotelServer.utill.JetUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Content-Type")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JetUtil jetUtil;
    private final UserService userService;
    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        try {
            UserDto createUser = authService.createUser(signupRequest);
            return new ResponseEntity<>(createUser, HttpStatus.OK);
        } catch (EntityNotFoundException entityNotFoundException) {
            return new ResponseEntity<>("User already exist", HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>("User not created , come again later ", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password ");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jetUtil.generateToken(userDetails);

        AuthenticationResponse response = new AuthenticationResponse();

        if (optionalUser.isPresent()){
            response.setJwt(jwt);
            response.setUserRole(optionalUser.get().getUserRole());
            response.setUserId(optionalUser.get().getId());
        }
        return response;
    }


}
