export interface CreateReserveDto {
    checkIn: Date;
    checkOut: Date;
    numberOfGuests: number;
    discountCode?: string;
}
