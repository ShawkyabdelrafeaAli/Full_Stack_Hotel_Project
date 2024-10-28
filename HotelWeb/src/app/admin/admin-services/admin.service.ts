import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserStorageService } from '../../services/auth/storage/user-storage.service';
import { RoomDto } from '../../room';
import { ReservationResponse } from '../../reservation-response';
@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private roomListUpdated = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:8082/api/admin';
  private apiUrl = 'http://localhost:8082/api/admin/add';
  constructor(private http:HttpClient) { }

  getRoomListUpdateStatus(): Observable<boolean> {
    return this.roomListUpdated.asObservable();
  }
  triggerRoomListUpdate(): void {
    this.roomListUpdated.next(true);
  }

  getRoomById(id: number): Observable<RoomDto>{
    const token = localStorage.getItem('token');
  
  if (token == null) {
    throw new Error('Authorization token not found');
  }
  // Use local object
  const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
    return this.http.get<RoomDto>(`${this.baseUrl}/room/getById/${id}`, { headers: httpHeaders });
  }


  updateRoom(id: number,room: RoomDto): Observable<RoomDto>{
    const token = localStorage.getItem('token');
 
  if (token == null) {
    throw new Error('Authorization token not found');
  }
  const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
    return this.http.put<RoomDto>(`${this.baseUrl}/room/update/${id}`, room,{ headers: httpHeaders });
  }


  // postRoom1(room: RoomDto, file: File): Observable<any> {
  //   debugger
  //   // Create FormData object
  //   const formData = new FormData();
  
  //   // Append the roomDto fields to the FormData object
  //   formData.append('roomDto', new Blob([JSON.stringify(room)], { type: 'application/json' }));
  
  //   // Append the image file to the FormData object
  //   formData.append('multipartFile', file);
  
  //   // Get the authorization headers
  //   const headers = this.createAuthorizationHeader();
  
  //   // Send the POST request with the FormData and headers
  //   return this.http.post(`${this.baseUrl}/add`, formData, { headers });
  // }
  // postRoom(roomDto: RoomDto): Observable<any> {
  //   const headers = this.createAuthorizationHeader(); // Use the method to create headers
  //   return this.http.post<any>(this.apiUrl, roomDto, { headers });
  // }

  addRoom(roomDto: RoomDto, file: File): Observable<any> {
    const formData = new FormData();
    // Append RoomDto fields to the FormData
    formData.append('name', roomDto.name);
    formData.append('type', roomDto.type);
    formData.append('price', roomDto.price.toString()); // Convert number to string
    formData.append('available', roomDto.available.toString()); // Convert boolean to string
    formData.append('multipartFile', file); // Ensure this key matches the @RequestPart name

    // Use the createAuthorizationHeader method to set the headers
    const headers = this.createAuthorizationHeader();

    return this.http.post(this.apiUrl, formData, { headers });
}

      
    getRooms(page: number): Observable <{roomDtoList:RoomDto[], totalPages:number,pageNumber:number}>{
      const token = localStorage.getItem('token');

      if (token == null) {
        throw new Error('Authorization token not found');
      }
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      return this.http.get<{roomDtoList:RoomDto[],totalPages:number,pageNumber:number}>(`${this.baseUrl}/room/getAll/${page}`,{ headers: httpHeaders });
    }

 
  deleteRoom(id: number): Observable<void>{
    const token = localStorage.getItem('token');
  if (token == null) {
    throw new Error('Authorization token not found');
  }
  // Use local object
  const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
    return this.http.delete<void>(`${this.baseUrl}/room/delete/${id}`, { headers: httpHeaders });
  } 

  createAuthorizationHeader(){
    
    let authHeaders: HttpHeaders = new HttpHeaders();
    const jwt = (localStorage.getItem('token'))
    console.log(jwt)
    return authHeaders.set(
      'Authorization',
      'Bearer ' + jwt
  
    )
  }


getReservations(pageNumber:number): Observable<ReservationResponse>{
  return this.http.get<ReservationResponse>(this.baseUrl+`/reservations/${pageNumber}`,{ 
    headers: this.createAuthorizationHeader(),
  })
}


changeResrvationsStatus(reservationId:number, status:string) : Observable<any>{
  return this.http.get(this.baseUrl+`/reservations/${reservationId}/${status}`,{
     headers: this.createAuthorizationHeader(),
  })
}






}  