import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../models/auth/login-dto';
import { ResponseDTO } from '../models/response-dto';
import { LoginResponseDTO } from '../models/login-response-dto';
import { createUserDTO } from '../models/create/create-user-dto';
import { Text } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = "http://localhost:8082/api/auth";

  constructor(private http: HttpClient) { }

  public login(loginDTO: LoginDto): Observable<ResponseDTO<LoginResponseDTO>> {
  return this.http.post<ResponseDTO<LoginResponseDTO>>(`${this.authURL}/login`, loginDTO);
  }
  
  public register(registerDTO: any): Observable<ResponseDTO<createUserDTO>> {
    return this.http.post<ResponseDTO<createUserDTO>>(`${this.authURL}`, registerDTO);
  }

  public sendCode(ResetPasswordDTO: any): Observable<ResponseDTO<String>> {
    return this.http.put<ResponseDTO<String>>(`${this.authURL}/change/password`, ResetPasswordDTO);
  }

  public recoverPassword(RequestResetPasswordDTO : any): Observable<ResponseDTO<String>> {
    return this.http.post<ResponseDTO<String>>(`${this.authURL}/password`, RequestResetPasswordDTO);
  }

}