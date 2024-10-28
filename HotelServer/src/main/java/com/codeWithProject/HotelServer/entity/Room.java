package com.codeWithProject.HotelServer.entity;

import com.codeWithProject.HotelServer.dto.RoomDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private  Long price;
    private boolean available;

    @Lob
    @Column(name = "photo", columnDefinition = "BLOB")
    private byte[] photo;
//    @Lob
//    @Column(name = "photo", columnDefinition = "blob")
//    private byte[] imageDate;
//    private String imageName;
//    private String imageType;
//    public RoomDto getTommDto(){
//        RoomDto  roomDto = new RoomDto();
//        roomDto.setId(id);
//        roomDto.setName(name);
//        roomDto.setType(type);
//        roomDto.setPrice(price);
//        roomDto.setAvailable(available);
//        return  roomDto;
//    }
}
