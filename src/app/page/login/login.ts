import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import { TokenService } from '../../services/token-service';
import { LoginDto } from '../../models/auth/login-dto';
import { ResponseDTO } from '../../models/response-dto';
import { LoginResponseDTO } from '../../models/login-response-dto';
import { CanActivateFn, Router } from '@angular/router';




@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  standalone: true,
  styleUrl: './login.css',
})
export class Login {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService, private router: Router) { 
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]]
    });
  }

  loginUser() {
    const loginDTO = this.loginForm.value as LoginDto;
    this.authService.login(loginDTO).subscribe({
      next: (response: ResponseDTO<LoginResponseDTO>) => {
        const loginResponse = response.data; 
        this.tokenService.login(loginResponse.token);
        alert(response.message); 
        this.router.navigate(['/main-page-guest']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al iniciar sesión');
      }
    });
  }





}
