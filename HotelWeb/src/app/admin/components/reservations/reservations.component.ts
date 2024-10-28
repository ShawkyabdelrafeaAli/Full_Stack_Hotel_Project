import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReservationResponse } from '../../../reservation-response';
import { CommonModule } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule,NzTagModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  // currentPage:any = 1;
  // total:any;
  // reservations:any;

  reservationResponse: ReservationResponse;
  pageNumber: number = 0;
  constructor(private adminService:AdminService, private message:NzMessageService){}

  ngOnInit(): void {
    this.loadReservations(this.pageNumber);
  }
  loadReservations(pageNumber: number): void {
    this.adminService.getReservations(pageNumber).subscribe(response => {
      this.reservationResponse = response;
    });
  }
  previousPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadReservations(this.pageNumber);
    }
  }

  nextPage(): void {
    if (this.pageNumber < this.reservationResponse.totalPages - 1) {
      this.pageNumber++;
      this.loadReservations(this.pageNumber);
    }
  }

  changeReservationStatus(id: number, status: string) {
    this.adminService.changeResrvationsStatus(id, status).subscribe({
      next: (response) => {
        // Handle success response (update UI accordingly)
        console.log('Status changed successfully:', response);
        this.loadReservations(this.pageNumber); 
      },
      error: (error) => {
        console.error('Error changing status:', error);
        alert('Failed to change reservation status. Please try again.');
      }
    });
  }
  // getReservations(){
  //   this.adminService.getReservations(this.currentPage -1).subscribe(res=>{
  //     console.log(res);
  //     this.reservations = res.reservationDtoList;
  //     this.total = res.totalPages*5;
  //   })
  // }
}
