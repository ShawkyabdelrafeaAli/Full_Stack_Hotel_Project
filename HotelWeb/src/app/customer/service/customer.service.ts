import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationDto } from '../../reservation-dto';
import { UserStorageService } from '../../services/auth/storage/user-storage.service';

const BASIC_URL = "http://localhost:8082"
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getRooms(pageNumber:Number):Observable<any>{
    return this.http.get(BASIC_URL + `/api/customer/rooms/${pageNumber}`,{

      headers: this.createAuthorizationHeader(),
    })
  }

  bookRoom(ReservationDto:any):Observable<ReservationDto>{
    // debugger
    return this.http.post<ReservationDto>(BASIC_URL + `/api/customer/booking`,ReservationDto,{

      headers: this.createAuthorizationHeader(),
    })
  }

  getMyBookings(pageNumber: number): Observable<any> {
    debugger;
    const userId = UserStorageService.getUserId();
    const url = `${BASIC_URL}/api/customer/bookings/${userId}/${pageNumber}`;
    console.log("UserID" + userId );
    console.log("Request URL:", url);  // Log the URL for debugging
    return this.http.get(url, {
      headers: this.createAuthorizationHeader(),
    });
  }
  
  // here the problem 




  createAuthorizationHeader(){
    
    let authHeaders: HttpHeaders = new HttpHeaders();
    const jwt = (localStorage.getItem('token'))
    console.log(jwt)
    return authHeaders.set(
      'Authorization',
      'Bearer ' + jwt
  
    )
  }
}
