import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TokenService } from '../../services/token-service';
import { UserService } from '../../services/user-service';
import  {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isLogged = false;
  fullName = '';
  initial = '';
  role = '';
  profilePhoto: string | null = null;
  isHost: boolean = false;

  constructor(private token: TokenService, private userService : UserService, private router : Router) {}

  ngOnInit() {
    this.isLogged = this.token.isLogged();
    this.role = this.token.getRole();
    if(this.role === 'HOST'){
      this.isHost = true;
    }
    const userId = this.token.getUserId();

    if (this.isLogged) {
      if(!this.isHost){
        this.userService.getUserById().subscribe({
          next: (response) => {
            const user = response.data;
            this.fullName = user.fullName;
            this.initial = this.fullName.charAt(0).toUpperCase();
            this.profilePhoto = user.profilePhoto || null;
          },
          error: (err) => {
            console.error('Error fetching user data:', err);
          }
        });
      }
      else{
        this.userService.getHostById().subscribe({
          next: (response) => { 
            const host = response.data;
            this.fullName = host.userDTO.fullName;
            this.initial = this.fullName.charAt(0).toUpperCase();
            this.profilePhoto = host.userDTO.profilePhoto || null;
          }
          ,
          error: (err) => {
            console.error('Error fetching host data:', err);
          }
          
        });

      }
    }
  }
    logout() {
    this.token.logout();
    window.location.reload();
    }

    getProfile() {
      const userId = this.token.getUserId();
      this.router.navigate([`/profile`]);
    }

    getProfileHost() { 
      const userId = this.token.getUserId();
      this.router.navigate([`/profile-host`]);
    } 

  
}