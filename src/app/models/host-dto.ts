import { UserDTO } from "./user-dto";

export interface HostDTO {
    userDTO: UserDTO
    documents: string[];
    aboutMe: string;
}
