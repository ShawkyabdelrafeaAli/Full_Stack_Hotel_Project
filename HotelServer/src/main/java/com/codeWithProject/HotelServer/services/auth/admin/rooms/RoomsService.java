package com.codeWithProject.HotelServer.services.auth.admin.rooms;

import com.codeWithProject.HotelServer.dto.RoomDto;
import com.codeWithProject.HotelServer.dto.RoomsResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface RoomsService {

    RoomDto postRoom(RoomDto roomDto, MultipartFile multipartFile) throws IOException;

//    RoomDto postRoom1(RoomDto roomDto) throws IOException;
    RoomsResponseDto getAllRooms(int pageNumber);
    RoomDto findRoomById(Long id);

    RoomDto updateRoom(Long id, RoomDto roomDto);

     void deleteRoomById(Long id);

}
