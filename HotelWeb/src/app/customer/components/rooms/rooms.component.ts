import { Component } from '@angular/core';
import { RoomDto } from '../../../room';
import { AdminService } from '../../../admin/admin-services/admin.service';
import { CustomerService } from '../../service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { UserStorageService } from '../../../services/auth/storage/user-storage.service';
import { error } from 'console';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  rooms: RoomDto[]=[];

  totalPages: number = 0; // Total pages for pagination
  pageNumber: number = 1;
  id: number;
  checkInDate: Date | null = null;
  checkOutDate: Date | null = null;

  constructor(private customerService: CustomerService
    , private message: NzMessageService
  
  ) { }

  ngOnInit(): void {
    this.fetchRooms(this.pageNumber);  
  }
  
  fetchRooms(page: number): void {  
    this.customerService.getRooms(page).subscribe((data) => {
      this.rooms = data.roomDtoList; 
      this.totalPages = data.totalPages;
      this.pageNumber = data.pageNumber;
    });
  }


  nextPage(): void {

    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.fetchRooms(this.pageNumber);
    }
  }

  previousPage(): void {
   
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchRooms(this.pageNumber);
    }
  }
  isFormValid(): boolean {
    return this.checkInDate !== null && this.checkOutDate !== null;
  }


  isvisiblemiddle = false;
  date: Date[] = [];

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const date = input.value ? new Date(input.value) : null;

    if (input.id === 'checkIn') {
      this.checkInDate = date;
    } else if (input.id === 'checkOut') {
      this.checkOutDate = date;
    }

    if (this.checkInDate && this.checkOutDate) {
      console.log('Check-in Date:', this.checkInDate);
      console.log('Check-out Date:', this.checkOutDate);
      // Add any additional logic needed after both dates are selected
    }
  }

  handleCancleMiddle() {
    this.isvisiblemiddle = false; // Handle any logic needed on cancel
  }

  hanldeOkMiddle(): void {
    const obj = {
      userId: UserStorageService.getUserId(),
      roomId: this.id,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };
    
    this.customerService.bookRoom(obj).subscribe(
      (res) => {
        this.message.success(`Request submitted for approval`, {
          nzDuration: 5000,
        });
        this.isvisiblemiddle = false;
      },
      (error) => {
        this.message.error(`${error.error}`, {
          nzDuration: 5000,
        });
      }
    );
  }

showModalMiddle(id:number){
  this.id = id;
  this.isvisiblemiddle = true;
  this.checkInDate = null; // Reset check-in date
    this.checkOutDate = null; 
}
}