package com.codeWithProject.HotelServer.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private Long id;
    private String name;
    private String type;
    private Long price;
    //    @Lob
//    @Column(name = "photo", columnDefinition = "blob")
//    private byte[] imageDate;
//    private String imageName;
//    private String imageType;
    @Lob
    @Column(name = "photo", columnDefinition = "BLOB")
    private byte[] photo;
    private boolean available;
}
