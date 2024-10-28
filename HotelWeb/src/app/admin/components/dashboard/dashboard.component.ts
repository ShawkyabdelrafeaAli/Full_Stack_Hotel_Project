import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { RoomDto } from '../../../room';
import { MatCardModule } from '@angular/material/card'; 
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatCardModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  rooms: RoomDto[]=[];

  totalPages: number = 0; // Total pages for pagination
  pageNumber: number = 1;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // this.loadRooms();
    // //  this.getRooms()
    this.fetchRooms(this.pageNumber);  
  }
  
  fetchRooms(page: number): void {

    // Use the service to fetch room data
    this.adminService.getRooms(page).subscribe((data) => {
      this.rooms = data.roomDtoList; // Assign the room list
      this.totalPages = data.totalPages; // Set total pages for pagination
      this.pageNumber = data.pageNumber; // Update current page
    });
  }


  nextPage(): void {
    // Navigate to the next page
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.fetchRooms(this.pageNumber); // Fetch rooms for the new page
    }
  }

  previousPage(): void {
    // Navigate to the previous page
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchRooms(this.pageNumber); // Fetch rooms for the new page
    }
  }   
  confirmDelete(roomId: number, page: number) {
    console.log('Delete button clicked for room:', roomId);
    
    const confirmDelete = window.confirm('Do you really want to delete this room?');
  
    if (confirmDelete) {
        console.log('Confirmed deletion for room:', roomId);
        this.deleteRoom(roomId, page);
    } else {
        console.log('Delete operation canceled.');
    }
}
  
deleteRoom(roomId: number, page: number): void {
    console.log('Executing delete for room:', roomId);
    
    this.adminService.deleteRoom(roomId).subscribe({
        next: () => {
            console.log('Room deleted successfully');
            this.fetchRooms(page);
        },
        error: (error) => {
            console.error('Error deleting room:', error);
        }
    });
}

  }
