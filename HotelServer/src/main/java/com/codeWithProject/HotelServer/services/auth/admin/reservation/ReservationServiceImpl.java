package com.codeWithProject.HotelServer.services.auth.admin.reservation;

import com.codeWithProject.HotelServer.dto.ReservationResponseDto;
import com.codeWithProject.HotelServer.entity.Reservation;
import com.codeWithProject.HotelServer.entity.Room;
import com.codeWithProject.HotelServer.enums.ReservationStatus;
import com.codeWithProject.HotelServer.repository.ReservationRepository;
import com.codeWithProject.HotelServer.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    public  static  final  int  SEARCH_RESULT_PER_PAGE = 4;

    public final RoomRepository roomRepository;
    public ReservationResponseDto getAllReservations(int pageNumber){
        Pageable pageable = PageRequest.of(pageNumber,SEARCH_RESULT_PER_PAGE);
        Page<Reservation> reservationPage = reservationRepository.findAll(pageable);
        ReservationResponseDto reservationResponseDto  = new ReservationResponseDto();
        reservationResponseDto.setReservationDtoList(reservationPage.stream().map(Reservation::getReservationDto).collect(Collectors.toList()));
        reservationResponseDto.setPageNumber(reservationPage.getPageable().getPageNumber());
        reservationResponseDto.setTotalPages(reservationPage.getTotalPages());
        return reservationResponseDto;
    }



    public boolean changeReservationStatus(Long id , String status){
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()){
            Reservation existingReservation = optionalReservation.get();
            if (Objects.equals(status,"Approve")){
                existingReservation.setReservationStatus(ReservationStatus.APPROVED);
            }else {
                existingReservation.setReservationStatus(ReservationStatus.REJECTED);
            }
            reservationRepository.save(existingReservation);

            Room existingRoom = existingReservation.getRoom();
            existingRoom.setAvailable(false);
            roomRepository.save(existingRoom);

            return true;
        }
        return false;
    }


}
