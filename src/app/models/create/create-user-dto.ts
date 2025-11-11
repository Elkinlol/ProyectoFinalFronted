export interface createUserDTO {
    fullName: string;
    email: string;
    password: string;
    numberPhone: string;
    birthday: Date;
    photoUrl?: string;
    rol: 'GUEST' | 'HOST'
}
