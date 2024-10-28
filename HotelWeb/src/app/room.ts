export class  RoomDto {

    id: number;
    name: string;
    type: string;
    price: number;
    available: boolean;
    photo?: Uint8Array;
}
