import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile-host',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-host.html',
  styleUrl: './profile-host.css',
})
export class ProfileHost {
  profileHostForm!: FormGroup;
  userInitial: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    const userName = 'Elkin Bermudez';
    this.userInitial = userName.charAt(0).toUpperCase();
  }   
  private createForm() {
    this.profileHostForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      photoUrl: [''],
      aboutMe: ['', [Validators.required, Validators.maxLength(200)]],
      documents: [[], [Validators.required]]
    });
  }
  public updateProfileHost() {
    console.log(this.profileHostForm.value);
  }

  public switchToUserProfile(){
    console.log("Cambiando al perfil de usuario");
  }
}
