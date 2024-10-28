import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input'
import { AuthService } from '../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule ,withFetch } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule,CommonModule  ,HttpClientModule],
  
})
export class RegisterComponent {
  registerForm!: FormGroup;
constructor(private fb: FormBuilder, 
  private authService:AuthService,
 private message:NzMessageService ,
private router:Router){}
ngOnInit(){
  this.registerForm = this.fb.group({
    email: [null, [Validators.required,Validators.email]],
    password: [null, Validators.required],
    name:[null, Validators.required]
  })
}
submitForm() {
  if (this.registerForm.valid) {

    this.authService.register(this.registerForm.value).subscribe(res => {
      if (res.id != null) {
       
        this.message.success("Signup successful", { nzDuration: 5000 });
        this.router.navigateByUrl("/");
      } else {
        
        this.message.error(`${res.message}`, { nzDuration: 5000 });
      }
    });
  }
}
}
