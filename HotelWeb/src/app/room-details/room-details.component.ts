import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnyRecord } from 'dns';
import { AdminService } from '../admin/admin-services/admin.service';
import { RoomDto } from '../room';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{

  id:any
   data:any
   
  rooms: RoomDto[]=[];
  constructor(private route:ActivatedRoute , private adminServ:AdminService){
    this.id = this.route.snapshot.paramMap.get("id")
  }
  ngOnInit(): void {
  this.getRoomsDetails()
  }

  getRoomsDetails(){
    this.adminServ.getRoomById(this.id).subscribe(res=>{
      this.data =res
    })
  }

  fetchRooms(page: number): void {
    this.adminServ.getRooms(page).subscribe((data) => {
      this.rooms = data.roomDtoList; 
    })
}
}
