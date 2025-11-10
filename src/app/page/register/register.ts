import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateListingDTO } from '../../models/create-listing-dto';
import { AuthService } from '../../services/auth-service';
import { ResponseDTO } from '../../models/response-dto';
import { createUserDTO } from '../../models/create-user-dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm!: FormGroup;
  RouterLink: any;
  role: String [];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.createForm();
    console.log('Register component initialized');
    this.role = ['HOST', 'GUEST'];
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    numberPhone: ['', [Validators.required, Validators.maxLength(11)]],
    photoUrl: [''],
    birthday: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
    repeatPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7)]],
    rol: ['GUEST', []]
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions);
 
    
  }
  public createUser() {
    const registerDTO = this.registerForm.value as createUserDTO;
    this.authService.register(registerDTO).subscribe({
      next: (response: ResponseDTO<createUserDTO>) => {
        const user = response.data; 
        console.log('Usuario registrado:', user);
        alert(response.message); 
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar usuario');
      }
    });
  }

  

  public passwordsMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmaPassword = formGroup.get('repeatPassword')?.value;
  // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
  return password == confirmaPassword ? null : { passwordsMismatch: true };
  }


}
