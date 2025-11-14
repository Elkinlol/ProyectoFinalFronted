export interface PlaceDTO {
    id: string;
    title: string;
    description: string;
    image: string[];
    services: string[];
    maxGuests: number;
    averageRating: number;
    nightlyPrice: number;
    hostId: string;
    adress: AddressDTO; // <- aquí el cambio
}

export interface AddressDTO{
    city: string;
    adress: string;
    latitud: string;
    longitud: string;
}
