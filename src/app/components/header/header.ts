import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TokenService } from '../../services/token-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isLogged = false;
  username = '';
  initial = '';
  role = '';

  constructor(private token: TokenService) {}

  ngOnInit() {
    this.isLogged = this.token.isLogged();
    this.role = this.token.getRole();

    this.initial = this.username.charAt(0).toUpperCase();
  }

  logout() {
    this.token.logout();
    window.location.reload();
  }
}
