import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { resetPasswordDTO } from '../../models/resetPasswordDTO';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-recover-password',
  imports: [ReactiveFormsModule],
  templateUrl: './recover-password.html',
  styleUrl: './recover-password.css',
})
export class RecoverPassword {
  recoverPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
    this.createForm();
  }
  private createForm() {
    this.recoverPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
      
    });
  }
  public recoverPassword() {
    const email = this.recoverPasswordForm.value.email;
    console.log('Recuperar contraseña para el email:', email);
    this.authService.sendCode({ email } as resetPasswordDTO).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/insert-code']);
        alert(response.message); 
      },
      error: (err) => {
        console.error(err);
        alert('Error al enviar el código de recuperación');
      }
    });
  }
}
