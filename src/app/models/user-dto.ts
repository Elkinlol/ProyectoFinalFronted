export interface UserDto {
    name: string;
    email: string;
    password: string;
    telefono: string;
    birthDate: Date;
    photoUrl?: string;
    rol: 'guest' | 'host'
}
