import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../../admin/admin-services/admin.service';
import { error } from 'console';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RoomDto } from '../../../room';


@Component({
  selector: 'app-post-room',
  standalone: true,
  imports: [
    CommonModule,       
    ReactiveFormsModule,
    NzFormModule, NzInputModule,FormsModule
     
  ],
  templateUrl: './post-room.component.html',
  styleUrl: './post-room.component.css'
})
export class PostRoomComponent {
  room: RoomDto = new RoomDto; // Default room model
  successMessage = '';
  errorMessage = '';
  roomForm!: FormGroup;
 // Initialize RoomDto
  selectedFile: File | null = null;

  constructor(private fb:FormBuilder ,private adminService:AdminService,private router: Router,){
    
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required], // New field for room type
      price: [0, [Validators.required, Validators.min(0)]], // New field for price with validation
      available: [true], // Default value for availability
      file: [null, Validators.required]
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.roomForm.patchValue({
      file: file
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      const roomDto: RoomDto = {
        name: this.roomForm.value.name,
        type: this.roomForm.value.type,
        price: this.roomForm.value.price,
        available: this.roomForm.value.available,
        id: 0
      };
      const file: File = this.roomForm.value.file;

      this.adminService.addRoom(roomDto, file).subscribe({
        next: (response) => {
          console.log('Room added successfully!', response);
          this.router.navigateByUrl("/dashboard")
          // Optionally, navigate or reset the form
        },
        error: (error) => {
          console.error('Error adding room', error);
          // Handle error response
        }
      });
    }
  }
}
     /// the good code 

  // addRoom(): string {
  //   let result = '';  // Variable to store the string result
    
  //   console.log('Room data before sending:', this.room); // Log room data before sending
    
  //   this.adminService.postRoom(this.room).subscribe({
  //     next: (response) => {
  //       this.room = response;
  //       console.log('Response from server:', response);  // Log the response data
  //       this.successMessage = 'Room added successfully!';
  //       this.errorMessage = '';  // Clear any error messages
  //       result = 'Room added successfully!';  // Set the result string
  //       this.router.navigateByUrl("/dashboard")
  //     },
  //     error: (err) => {
  //       console.error('Error:', err);  // Log the error
  //       this.errorMessage = 'Error adding room.';
  //       this.successMessage = '';  // Clear success message
  //       result = 'Error adding room.';  // Set the result string
  //     }
  //   });
    
  //   return result;  // This will return immediately before the request completes, which may not be useful
  // }
  







  // savePost(){
  //   this.adminService.postRoomDetails(this.roomDetailsForm.value).subscribe( data =>{
  //     console.log(data);
  //     this.goToStudentList();
  //   },
  //   error => console.log(error));
  // }

  // goToStudentList(){
  //   this.router.navigate(['/dashboard']);
  // }
  // submitForm(){
  //   this.adminService.postRoom(this.roomDetailsForm.value).subscribe( res =>{
  //       console.log('Room posted successfully:', res);
  //       this.message.success('Room Posted Successfully', { nzDuration: 5000 });
  //       this.router.navigateByUrl('/dashboard');
  //     },
  //     (error: any) => {
  //       // Error response handling
  //       console.error('Error posting room details:', error);
  //       this.message.error(
  //         error?.error?.message || 'An unexpected error occurred.',
  //         { nzDuration: 5000 }
  //       );
  //     }
  //   );
  // }

//   onSubmit(){
//     console.log(this.roomDetailsForm.value);
//     this.savePost();
//   }

//   loginForm = new FormGroup({
//     name:new FormControl('',[Validators.required]),
//     type:new FormControl('',[Validators.required]),
//     price:new FormControl('',[Validators.required]),

//   })
// loginStudent()
// {
//   console.warn(this.loginForm.value)
// }

// get name(){
//   return this.loginForm.get('name');
// }
// get type(){
//   return this.loginForm.get('type');
// }
// get price(){
//   return this.loginForm.get('price');
// }



