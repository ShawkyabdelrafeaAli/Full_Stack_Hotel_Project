package com.codeWithProject.HotelServer.dto;

import com.codeWithProject.HotelServer.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;
    private long userId;
    private UserRole userRole;
}
