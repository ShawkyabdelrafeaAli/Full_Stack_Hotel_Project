import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input'
import { AuthService } from '../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule ,withFetch } from '@angular/common/http';
import { UserStorageService } from '../services/auth/storage/user-storage.service';
@Component({
  selector: 'app-login',
   standalone: true,
   imports: [ReactiveFormsModule, NzFormModule, NzInputModule,CommonModule  ,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private auth:AuthService,
    private router: Router
  
  ){}
  

    ngOnInit(){
      this.loginForm =this.fb.group({
        email: [null,[Validators.required,Validators.email]],
        password: [null,[Validators.required]]
      })
    }

    submitForm(){
      this.authService.login(this.loginForm.value).subscribe(res=>{
        console.log(res);
        if(res.userId != null){
          
          UserStorageService.saveUser(res);  
        
          UserStorageService.saveToken(res.jwt);
          // UserStorageService.saveRole(res.userRole)

          this.auth.isLoggin = true;

          if(UserStorageService.isAdminLonggedIn()){
            this.router.navigateByUrl("/dashboard")
          }else if(UserStorageService.isCustomerLoggedIn()){
              this.router.navigateByUrl("/customer/rooms");
          }
          
        }
      },error=>{
        this.message
        .error(
          `Bad credentials`,
          {nzDuration: 5000}
        )
      })
    }
  }  
