import { Component } from '@angular/core';
import { CustomerService } from '../../../customer/service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'app-view-bookings',
  standalone: true,
  imports: [CommonModule, NzTableModule,NzTagModule,NzPaginationModule],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent {
  bookings: any[] = [];
  currentPage = 1;
  total = 0;
constructor(private customerService:CustomerService, private message:NzMessageService ){
  // this.getBookings();
}
ngOnInit(): void {
  this.getBookings(this.currentPage);
}
getBookings(page: number) {
  this.customerService.getMyBookings(page).subscribe(
    (data) => {
      console.log("Bookings Data:", data); // Log data received from backend
      // Process your data here
    },
    (error) => {
      console.error("Error fetching bookings:", error);
      // Display a user-friendly message or handle the error as needed
      if (error.status === 404) {
        console.error("No bookings found for this user.");
      } else if (error.status === 500) {
        console.error("Server error. Please try again later.");
      }
    }
  );
}

pageIndexChange(value: number) {
  this.currentPage = value;
  this.getBookings(this.currentPage);
}
}