import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../services/token-service';
import { UserService } from '../../services/user-service';
import {Router} from "@angular/router";
import{Header} from"../../components/header/header";

@Component({
  selector: 'app-profile-host',
  imports: [ReactiveFormsModule, Header],
  templateUrl: './profile-host.html',
  styleUrl: './profile-host.css',
})
export class ProfileHost {
  profileHostForm!: FormGroup;
  userInitial: string = '';
  profilePhoto: String | null = null;

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService,
     private userService: UserService, private router: Router) {
    this.createForm();
  }   
  private createForm() {
    this.profileHostForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      numberPhone: ['', [Validators.required, Validators.maxLength(11)]],
      profilePhoto: [''],
      aboutMe: ['', [Validators.required, Validators.maxLength(200)]],
      documents: [[], [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['']
    });
  }

  ngOnInit() {
    const userId = this.tokenService.getUserId();
    this.userService.getHostById().subscribe({
      next: (response) => {
        const host = response.data;
        this.profileHostForm.patchValue({
          fullName: host.userDTO.fullName,
          numberPhone: host.userDTO.numberPhone,
          aboutMe: host.aboutMe,
          email: host.userDTO.email,
          rol: this.tokenService.getRole(),
          documents: host.documents || [],
        });
        this.profilePhoto = host.userDTO.profilePhoto || ''; 
        this.userInitial = !host.userDTO.profilePhoto 
        ? host.userDTO.fullName.charAt(0).toUpperCase() 
        : '';
      }
      ,
      error: (err) => {
        console.error('Error fetching host data:', err);
      }
    });
  }

  public updateProfileHost() {
    if (this.profileHostForm.valid) {
      const updateHostDTO = this.profileHostForm.value;
      this.userService.updateHost(updateHostDTO).subscribe({
        next: (response) => {
          alert('Perfil de anfitrión actualizado con éxito');
        },
        error: (err) => {
          console.error('Error updating host profile:', err);
          alert('Error al actualizar el perfil de anfitrión');
        }
      });
    }
  }

  public switchToUserProfile(){
    this.userService.upgradeToGuest().subscribe({
      next: (response) => {
        this.tokenService.login(response.data);
        this.router.navigate([`/main-pge-guest`]);
      },
      error: (err) => {
        console.error('Error switching to user profile:', err);
        alert('Error al cambiar al perfil de usuario');
      }
    });
  }

  public onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.userService.updatePhoto(file).subscribe({
        next: (response) => {
          alert('Foto de perfil actualizada con éxito');
          this.profilePhoto = response.data; 
        },
        error: (err) => {
          console.error('Error updating profile photo:', err);
          alert('Error al actualizar la foto de perfil');
        }
      });
    }
  }

  public changePassword(){
    this.router.navigate([`/change-password`]);
  }

  public deleteAccount(){
    this.userService.deleteUserAccount().subscribe({
      next: (response) => {
        alert('Cuenta eliminada con éxito');
        this.tokenService.logout();
        this.router.navigate([`/home`]);
      },
      error: (err) => {
        console.error('Error deleting account:', err);
        alert('Error al eliminar la cuenta');
      }
    });
  }
}
