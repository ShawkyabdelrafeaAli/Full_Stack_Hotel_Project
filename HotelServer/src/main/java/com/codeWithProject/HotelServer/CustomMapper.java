package com.codeWithProject.HotelServer;

import com.codeWithProject.HotelServer.dto.RoomDto;
import com.codeWithProject.HotelServer.entity.Room;

public class CustomMapper {

    public static Room mapToRoom(RoomDto roomDto){
        return Room.builder().id(roomDto.getId())
                .price(roomDto.getPrice())
                .type(roomDto.getType())
                .name(roomDto.getName())
                .photo(roomDto.getPhoto())
//                .imageDate(roomDto.getImageDate())
//                .imageName(roomDto.getImageName())
//                .imageType(roomDto.getImageType())
                .available(true).build();
    }


    public static RoomDto mapToRoomDto(Room room){
        return RoomDto.builder().id(room.getId())
                .price(room.getPrice())
                .type(room.getType())
                .name(room.getName())
                .photo(room.getPhoto())
//                .imageType(room.getImageType())
//                .imageDate(room.getImageDate())
//                .imageName(room.getImageName())
                .available(true).build();
    }




}
