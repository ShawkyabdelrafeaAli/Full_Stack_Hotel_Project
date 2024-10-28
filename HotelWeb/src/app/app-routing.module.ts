import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { RoomsComponent } from './customer/components/rooms/rooms.component';
import { PostRoomComponent } from './customer/components/post-room/post-room.component';
import { UpdateRoomComponent } from './customer/components/update-room/update-room.component';
import { ReservationsComponent } from './admin/components/reservations/reservations.component';
import { ViewBookingsComponent } from './admin/components/view-bookings/view-bookings.component';
import { RoomDetailsComponent } from './room-details/room-details.component';




export const routes: Routes = [


{ path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
{ path: '', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
 { path: 'customer', loadComponent: () => import('./customer/customer.component').then(m => m.CustomerComponent) },
 { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
 { path: 'dashboard', component: DashboardComponent},
 { path: 'customer/rooms', component: RoomsComponent},
 { path: 'room/:id/edit', component: UpdateRoomComponent},
 { path: 'reservations', component: ReservationsComponent},
 {path:'admin/rooms',component: PostRoomComponent},
 {path:'bookings',component: ViewBookingsComponent},
 {path:'details/:id',component: RoomDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]  
})
export class AppRoutingModule { }
