import { UserDTO } from './user-dto';

export interface LoginResponseDTO {
    userDTO: UserDTO;
    token: string;
}
