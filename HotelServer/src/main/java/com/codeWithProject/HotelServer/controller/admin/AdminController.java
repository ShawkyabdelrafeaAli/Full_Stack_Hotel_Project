package com.codeWithProject.HotelServer.controller.admin;

import com.codeWithProject.HotelServer.dto.RoomDto;
import com.codeWithProject.HotelServer.excpetion.NotFoundException;
import com.codeWithProject.HotelServer.services.auth.admin.rooms.RoomsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {


        private final RoomsService roomsService;

        @PostMapping("/add")
        public ResponseEntity<?> postRoom(
                @ModelAttribute RoomDto roomDto,
                @RequestPart("multipartFile") MultipartFile multipartFile) throws IOException {
            return new ResponseEntity<>(roomsService.postRoom(roomDto, multipartFile), HttpStatus.OK);
        }

//    @PostMapping("/add")
//    public ResponseEntity<?> postRoom1(
//            @RequestBody RoomDto roomDto
//            ) throws IOException {
//        return new ResponseEntity<>(roomsService.postRoom1(roomDto), HttpStatus.OK);
//    }
    @GetMapping("/room/getAll/{pageNumber}")
        public ResponseEntity<?> getAllRooms(@PathVariable int pageNumber) {
            return ResponseEntity.ok(roomsService.getAllRooms(pageNumber));

        }

        @GetMapping("/room/getById/{id}")
        public ResponseEntity<?> getRoomById(@PathVariable Long id) {
            try {
                RoomDto roomDTO = roomsService.findRoomById(id);
                return ResponseEntity.ok(roomDTO);
            } catch (NotFoundException ex) {
                // Handle the case where the room is not found
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
            } catch (Exception ex) {
                // Handle other potential exceptions
                return new ResponseEntity<>("An error occurred while retrieving the room", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @PutMapping("/room/update/{id}")
        public ResponseEntity<?> updateRoom(@PathVariable Long id, @RequestBody RoomDto roomDto) {
            try {
                RoomDto updatedRoom = roomsService.updateRoom(id, roomDto);
                return ResponseEntity.ok(updatedRoom);
            } catch (NotFoundException ex) {
                // Handle the case where the room is not found
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
            } catch (Exception ex) {
                // Handle other potential exceptions
                return new ResponseEntity<>("An error occurred while retrieving the room", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        //
        //    @DeleteMapping("/api/admin/room/delete/{id}")
        //    public ResponseEntity<Map<String, String>> deleteRoom(@PathVariable Long id) {
        //        // Perform deletion logic here
        //        Map<String, String> response = new HashMap<>();
        //        response.put("message", "Room deleted successfully");
        //        return ResponseEntity.ok(response);  // Return JSON with a success message
        //    }


        @DeleteMapping("/room/delete/{id}")
        public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
            try {
                roomsService.deleteRoomById(id); // Your service layer method to delete a room
                return new ResponseEntity<>("Room deleted successfully", HttpStatus.OK);
            } catch (NotFoundException ex) {
                // Handle the case where the room is not found
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
            } catch (Exception ex) {
                return ResponseEntity.noContent().build();
                //            return new ResponseEntity<>("An error occurred while updating the room", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }


}
