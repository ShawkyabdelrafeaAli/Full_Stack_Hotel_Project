package com.codeWithProject.HotelServer.services.auth;

import com.codeWithProject.HotelServer.dto.RoomDto;
import com.codeWithProject.HotelServer.dto.SignupRequest;
import com.codeWithProject.HotelServer.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);


}
