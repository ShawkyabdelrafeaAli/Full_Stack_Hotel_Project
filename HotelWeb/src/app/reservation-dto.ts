export class ReservationDto {
    id: number;
    userId: number;
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
    price?:number;
    username:string;
    roomName:string;
    roomType:string;
    reservationStatus:string;
}
