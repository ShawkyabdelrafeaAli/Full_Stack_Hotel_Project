import { Component } from '@angular/core';
import { UserStorageService } from '../services/auth/storage/user-storage.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { AdminService } from '../admin/admin-services/admin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  isCustomerLoggedin: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLonggedIn();

  constructor(private router: Router, private auth:AuthService, private adminService:AdminService) { }

  ngOnInit() {


    this.router.events.subscribe(event => {

      if (event.constructor.name===  "NavigationEnd") {
        this.isCustomerLoggedin = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLonggedIn();
        console.log('Customer Logged In:', this.isCustomerLoggedin);
        console.log('Admin Logged In:', this.isAdminLoggedIn);
      }
    })

    this.isAdminLoggedIn;

  }

  
  logout() {
    UserStorageService.signOut();
    // this.isCustomerLoggedin = false; // Reset the state
    // this.isAdminLoggedIn = false;     // Reset the state
    this.router.navigateByUrl('/');
  }
 
}
 