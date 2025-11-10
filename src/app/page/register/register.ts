import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.createForm();
    console.log('Register component initialized');
    this.role = ['Anfitrion', 'Huesped'];
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(11)]],
    photoUrl: [''],
    dateBirth: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
    repeatPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7)]]
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions);
 
    
  }

  public createUser() {
    console.log(this.registerForm.value);
    this.router.navigate(['/login']);

  }

  public passwordsMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmaPassword = formGroup.get('repeatPassword')?.value;
  // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
  return password == confirmaPassword ? null : { passwordsMismatch: true };
  }


}
