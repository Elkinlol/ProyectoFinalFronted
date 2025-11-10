import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { resetPasswordDTO } from '../../models/resetPasswordDTO';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-insert-code',
  imports: [ ReactiveFormsModule],
  templateUrl: './insert-code.html',
  styleUrl: './insert-code.css',
})
export class InsertCode {
  insertCodeForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { 
    this.createForm();
  }

  private createForm() {
    this.insertCodeForm = this.formBuilder.group({
      recuperationCode: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      newPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  public insertCode() {
    const insertCodeDTO = this.insertCodeForm.value as resetPasswordDTO;
    this.authService.recoverPassword(insertCodeDTO).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        alert(response.message); 
      },
      error: (err) => {
        console.error(err);
        alert('Error al cambiar la contraseña');
      }
    });
  }

}
