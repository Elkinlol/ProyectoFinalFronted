import { UpdateProfileDTO } from "./update-profile-dto";
export interface UpdateProfileHostDTO {
    aboutMe?: string;
    documents?: string[];
    updateProfile?:UpdateProfileDTO
}
