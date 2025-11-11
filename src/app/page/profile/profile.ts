import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../services/token-service';
import { UserService } from '../../services/user-service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileForm!: FormGroup;
  userInitial: string = '';
  profilePhoto: String | null = null;


  constructor(private formBuilder: FormBuilder, private tokenService: TokenService, private userService: UserService, 
    private router: Router) {
    this.createForm();
  }

  private createForm() {
    this.profileForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      numberPhone: ['', [Validators.required, Validators.maxLength(11)]],
      profilePhoto: [''],
      rol: [''],
      email: ['']
    });
  }


  ngOnInit() {
    const userId = this.tokenService.getUserId();
    this.userService.getUserById().subscribe({
      next: (response) => {
        const user = response.data;
        console.log('RAW response from getUserById():', response);
        console.log('user object fields:', Object.keys(user), user);
        this.profileForm.patchValue({
          fullName: user.fullName,
          numberPhone: user.numberPhone,
          email: user.email,
          rol: this.tokenService.getRole(),
        });
        this.profilePhoto = user.profilePhoto || ''; 
        this.userInitial = !user.profilePhoto 
        ? user.fullName.charAt(0).toUpperCase() 
        : '';
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    }); 
  }


  public updateProfile() {
    if (this.profileForm.valid) {
      const updateProfileDTO = this.profileForm.value;
      this.userService.updateUser(updateProfileDTO).subscribe({
        next: (response) => {
          alert('Perfil actualizado con éxito');
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          alert('Error al actualizar el perfil');
        }
      });
      
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }
  
  public changePassword(){
    this.router.navigate([`/change-password`]);
  }
  public siwtchToHostProfile(){
    this.userService.upgradeToHost().subscribe({
      next: (response) => {
        this.tokenService.login(response.data);

        
        alert('Felicidades! Ahora eres un host.');
        this.router.navigate([`/main-page-host`]);
    }
      ,
      error: (err) => {
        console.error('Error upgrading to host:', err);
        alert('Error al cambiar a perfil de host');
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
  public deleteAccount(){
    this.userService.deleteUserAccount().subscribe({
      next: (response) => {
        alert('Cuenta eliminada con éxito');
        this.tokenService.logout();
        this.router.navigate([`/login`]);
      },
      error: (err) => {
        console.error('Error deleting account:', err);
        alert('Error al eliminar la cuenta');
      }
    });
  }

}
