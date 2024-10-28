
import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { UserStorageService } from './services/auth/storage/user-storage.service';
import { NavigationEnd, Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./App.Component.css'],
})
export class AppComponent {

  }
  const title = 'HotelWeb';

//   isCustomerLoggedin: boolean = UserStorageService.isCustomerLoggedIn();
//   isAdminLoggedIn: boolean = UserStorageService.isAdminLonggidIn();

//   constructor(private router: Router) { }

//   ngOnInit() {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.isCustomerLoggedin = UserStorageService.isCustomerLoggedIn();
//         this.isAdminLoggedIn = UserStorageService.isAdminLonggidIn();
//         console.log('Customer Logged In:', this.isCustomerLoggedin);
//         console.log('Admin Logged In:', this.isAdminLoggedIn);
//       }
//     });

//     this.isAdminLoggedIn;

//   }
//   logout() {
//     UserStorageService.signOut();
//     // this.isCustomerLoggedin = false; // Reset the state
//     // this.isAdminLoggedIn = false;     // Reset the state
//     this.router.navigateByUrl('/');
//   }