package com.codeWithProject.HotelServer.controller.customer;

import com.codeWithProject.HotelServer.controller.customer.booking.BookingService;
import com.codeWithProject.HotelServer.dto.ReservationDto;
import com.codeWithProject.HotelServer.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/booking")
    public ResponseEntity<ReservationDto>postBooking(@RequestBody ReservationDto reservationDto){
        boolean success = bookingService.postReservation(reservationDto);


        if (success) {
            // Return the ReservationDto object in the response body with status 200 OK
            return ResponseEntity.ok(reservationDto);
        } else {
            // Return a 404 Not Found status with no body
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

@GetMapping("/bookings/{userId}/{pageNumber}")
    public ResponseEntity<?> getAllBookingByUserId(@PathVariable  Long userId, @PathVariable int pageNumber){
        try{
            return ResponseEntity.ok(bookingService.getAllReservationByUserId(userId,pageNumber));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }
}
