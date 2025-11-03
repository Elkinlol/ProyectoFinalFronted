import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileForm!: FormGroup;
  userInitial: string = '';
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    console.log('Profile component initialized');
    const userName = 'Elkin Bermudez';
    this.userInitial = userName.charAt(0).toUpperCase(); 
  }
  private createForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      photoUrl: ['']
    });
  }
  public updateProfile() {
    console.log(this.profileForm.value);
  }
  
  public changePassword(){
    console.log("Navegando a la página de cambio de contraseña");
  }
  public siwtchToHostProfile(){
    console.log("Cambiando al perfil de anfitrión");
  }

}
