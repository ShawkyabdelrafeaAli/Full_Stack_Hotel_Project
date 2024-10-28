import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../../admin/admin-services/admin.service';
import { CommonModule } from '@angular/common';
import { RoomDto } from '../../../room';

@Component({
  selector: 'app-update-room',
  standalone: true,
  imports: [ CommonModule,       
    ReactiveFormsModule,
   FormsModule],
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.css'
})
export class UpdateRoomComponent {
  successMessage = '';
  errorMessage = '';
  roomId: number;
  roomDetailsForm: FormGroup;
  room: RoomDto = new RoomDto();
  constructor(private fb:FormBuilder
    ,private message: NzMessageService
  , private router: Router,
private adminService:AdminService,
  private activatedroter: ActivatedRoute
){
    
    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['',Validators.required],
      price: ['' , Validators.required],
      available:['',Validators.required]
    })
  }
  ngOnInit(): void{
    this.roomId = this.activatedroter.snapshot.params['id'];
    this.adminService.getRoomById(this.roomId).subscribe(data => {
      this.room = data;
    }, error => console.log(error));
  }

  updateRoom(){
    this.adminService.updateRoom(this.roomId,this.room).subscribe( data =>{
      this.goToDashboardList();
      this.successMessage = 'Room updated successfully!';
    }
    , error => console.log(error));
  }


goToDashboardList(){
  this.router.navigate(['/dashboard']);
}

}
