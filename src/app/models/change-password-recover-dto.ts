export interface ChangePasswordRecoverDto {
    email: string;
    newPassword: string;
    recoveryCode: string;
}
