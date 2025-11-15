import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root',
})
export class Enums {
  private baseUrl = 'http://localhost:8082/api/enums';

  constructor(private http: HttpClient, private tokenService: TokenService){

  }
  
  getServices(): Observable<string[]> {

    const token= this.tokenService.getToken();

    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    }; 

    return this.http.get<string[]>(this.baseUrl);
  }

  getReservationStatus(): Observable<string[]> {

    const token= this.tokenService.getToken();

    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    }; 
    return this.http.get<string[]>(this.baseUrl);
  }
  
}
