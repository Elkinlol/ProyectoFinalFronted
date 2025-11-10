export interface RequestResetPasswordDTO {
    email: string;
    newPassword: string;
    recuperationCode: string;
}
