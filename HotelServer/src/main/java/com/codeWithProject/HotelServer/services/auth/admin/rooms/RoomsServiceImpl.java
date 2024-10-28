package com.codeWithProject.HotelServer.services.auth.admin.rooms;

import com.codeWithProject.HotelServer.CustomMapper;
import com.codeWithProject.HotelServer.excpetion.NotFoundException;
import com.codeWithProject.HotelServer.dto.RoomDto;
import com.codeWithProject.HotelServer.dto.RoomsResponseDto;
import com.codeWithProject.HotelServer.entity.Room;
import com.codeWithProject.HotelServer.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomsServiceImpl implements RoomsService{

    private final RoomRepository roomRepository;

    public RoomDto postRoom(RoomDto roomDto, MultipartFile multipartFile) throws IOException {

        Room room = CustomMapper.mapToRoom(roomDto);
        if (multipartFile != null) {
            room.setPhoto(multipartFile.getBytes());
        }
//        room.setImageName(multipartFile.getOriginalFilename());
//        room.setImageType(multipartFile.getContentType());
//        room.setImageDate(multipartFile.getBytes());
        RoomDto returnedRoomDto = CustomMapper.mapToRoomDto(roomRepository.save(room));

        return returnedRoomDto;
    }

//    @Override
//    public RoomDto postRoom1(RoomDto roomDto) throws IOException {
//        Room room = CustomMapper.mapToRoom(roomDto);
//        RoomDto returnedRoomDto = CustomMapper.mapToRoomDto(roomRepository.save(room));
//
//        return returnedRoomDto;
//    }

    public RoomsResponseDto getAllRooms(int pageNumber){
        Pageable pageable = PageRequest.of(pageNumber,6);
        Page<Room> roomPage = roomRepository.findAll(pageable);
        RoomsResponseDto roomsResponseDto = new RoomsResponseDto();
        roomsResponseDto.setPageNumber(roomPage.getPageable().getPageNumber());
        roomsResponseDto.setTotalPages(roomPage.getTotalPages());
        roomsResponseDto.setRoomDtoList(roomPage.stream().map(room -> CustomMapper.mapToRoomDto(room)).collect(Collectors.toList()));
        return roomsResponseDto;
    }

    @Override
    public RoomDto findRoomById(Long id) {

        Optional<Room> room = roomRepository.findById(id);
        if (room.isPresent()) {
            Room entity = room.get();
            // Convert entity to DTO
            return new RoomDto(
                    entity.getId(),
                    entity.getName(),
                    entity.getType(),
                    entity.getPrice(),
                    entity.getPhoto(),
                    entity.isAvailable()


            );
        } else {
            throw new NotFoundException("Room not found with id: " + id);
        }
    }

    @Override
    public RoomDto updateRoom(Long id, RoomDto roomDto) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new NotFoundException("Room with id " + id + " not found"));
        // Update the room entity with the data from the DTO
        room.setName(roomDto.getName());
        room.setType(roomDto.getType());
        room.setPrice(roomDto.getPrice());
        room.setAvailable(roomDto.isAvailable());
//        room.setImageDate(roomDto.getImageDate());
//        room.setImageName(roomDto.getImageName());
//        room.setImageType(roomDto.getImageType());

        // Save the updated room entity
        Room updatedRoom = roomRepository.save(room);

        // Convert the updated entity back to a DTO
        RoomDto updatedRoomDto = new RoomDto();
        updatedRoomDto.setId(updatedRoom.getId());
        updatedRoomDto.setName(updatedRoom.getName());
        updatedRoomDto.setType(updatedRoom.getType());
        updatedRoomDto.setPrice(updatedRoom.getPrice());
        updatedRoomDto.setAvailable(updatedRoom.isAvailable());
//        updatedRoomDto.setImageDate(updatedRoom.getImageDate());
//        updatedRoomDto.setImageName(updatedRoom.getImageName());
//        updatedRoomDto.setImageType(updatedRoom.getImageType());
        return updatedRoomDto;
    }

    public void deleteRoomById(Long id) {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("Room not found");
        }
    }

//    public RoomDto getRoomById(Long id){
//        Optional<Room> optionalRoom = roomRepository.findById(id);
//        if (optionalRoom.isPresent()){
//            return optionalRoom.get().getRoomDto();
//        }
//    }
}
