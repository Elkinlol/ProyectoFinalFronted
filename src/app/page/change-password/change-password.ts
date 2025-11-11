import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { TokenService } from '../../services/token-service';  


@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  changePasswordForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private tokenService: TokenService, private router: Router) {
    this.createForm();
    console.log('ChangePassword component initialized');
  }
  private createForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

  public changePassword() {
    if (this.changePasswordForm.valid) {
      const changePasswordDTO = this.changePasswordForm.value;
      if (changePasswordDTO.newPassword !== changePasswordDTO.confirmNewPassword) {
        alert('La nueva contraseña y la confirmación no coinciden');
        return;
      }
    this.userService.changePassword(changePasswordDTO).subscribe({
      next: (response) => {
        alert('Contraseña cambiada con éxito');
        this.router.navigate([`/profile`]);
        console.log('Password changed successfully:', response);
        },
      error: (err) => {
        console.error('Error changing password:', err);
        alert('Error al cambiar la contraseña');
        }
      });
    }
  }
}
