package com.codeWithProject.HotelServer.controller.customer.booking;

import com.codeWithProject.HotelServer.dto.ReservationDto;
import com.codeWithProject.HotelServer.dto.ReservationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public interface BookingService {

    boolean postReservation(ReservationDto reservationDto);
    public ReservationResponseDto getAllReservationByUserId(Long userId, int pageNumber);
}
