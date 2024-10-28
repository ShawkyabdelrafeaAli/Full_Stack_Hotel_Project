import { ReservationDto } from "./reservation-dto";

export class ReservationResponse {
    totalPages: number;      
  pageNumber: number;     
  reservationDtoList: ReservationDto[];  
}
