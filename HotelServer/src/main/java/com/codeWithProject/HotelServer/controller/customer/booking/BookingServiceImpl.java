package com.codeWithProject.HotelServer.controller.customer.booking;

import com.codeWithProject.HotelServer.dto.ReservationDto;
import com.codeWithProject.HotelServer.dto.ReservationResponseDto;
import com.codeWithProject.HotelServer.entity.Reservation;
import com.codeWithProject.HotelServer.entity.Room;
import com.codeWithProject.HotelServer.entity.User;
import com.codeWithProject.HotelServer.enums.ReservationStatus;
import com.codeWithProject.HotelServer.repository.ReservationRepository;
import com.codeWithProject.HotelServer.repository.RoomRepository;
import com.codeWithProject.HotelServer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService{
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;
    private static final int SEARCH_RESULT_PER_PAGE = 4;
    public boolean postReservation(ReservationDto reservationDto){
        Optional<User> optionalUser = userRepository.findById(reservationDto.getUserId());
        Optional<Room> optionalRoom = roomRepository.findById(reservationDto.getRoomId());

        if (optionalRoom.isPresent() && optionalUser.isPresent()){
            Reservation reservation = new Reservation();
            reservation.setRoom(optionalRoom.get());
            reservation.setUser(optionalUser.get());
            reservation.setCheckInDate(reservationDto.getCheckInDate());
            reservation.setCheckOutDate(reservationDto.getCheckOutDate());
            reservation.setReservationStatus(ReservationStatus.PENDING);

            if (reservationDto.getCheckInDate() != null && reservationDto.getCheckOutDate() != null) {
              long days = ChronoUnit.DAYS.between(reservationDto.getCheckInDate(), reservationDto.getCheckOutDate());
                System.out.println("Number of days: " + days);
                reservation.setPrice(optionalRoom.get().getPrice() * days);
            } else {
                System.out.println("Check-in or check-out date is null.");
            }


            reservationRepository.save(reservation);
            return true;
        }
        return false;
    }

    public ReservationResponseDto getAllReservationByUserId(Long userId, int pageNumber){
        Pageable pageable = PageRequest.of(pageNumber,SEARCH_RESULT_PER_PAGE);
        Page<Reservation> reservationPage = reservationRepository.findAllByUserId(pageable,userId);
        ReservationResponseDto reservationResponseDto  = new ReservationResponseDto();
        reservationResponseDto.setReservationDtoList(reservationPage.stream().map(Reservation::getReservationDto).collect(Collectors.toList()));
        reservationResponseDto.setPageNumber(reservationPage.getPageable().getPageNumber());
        reservationResponseDto.setTotalPages(reservationPage.getTotalPages());
        return reservationResponseDto;
    }
}
