import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user-dto';
import { ResponseDTO } from '../models/response-dto';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token-service';
import { UpdateProfileDTO } from '../models/update/update-profile-dto';
import { HostDTO } from '../models/host-dto';
import { UpdateProfileHostDTO } from '../models/update/update-profile-host-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = "http://localhost:8082/api/user";

  constructor(private http: HttpClient, private tokenService: TokenService) { 
  }

  public getUserById(): Observable<ResponseDTO<UserDTO>> {

    const token= this.tokenService.getToken();

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    });

    return this.http.get<ResponseDTO<UserDTO>>(`${this.userURL}`, { headers: headers });
  }

  public updateUser(updateProfileDTO: UpdateProfileDTO): Observable<ResponseDTO<UserDTO>> {
    const token= this.tokenService.getToken();

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    });
    return this.http.put<ResponseDTO<UserDTO>>(`${this.userURL}`, updateProfileDTO, { headers: headers });
  }

  public changePassword(changePasswordDTO: any): Observable<ResponseDTO<String>> {
    const token= this.tokenService.getToken();

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    });
    return this.http.patch<ResponseDTO<String>>(`${this.userURL}/password`, changePasswordDTO, { headers: headers });
  }

  public updatePhoto(file: File): Observable<ResponseDTO<String>> {
    const token= this.tokenService.getToken();

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
    });
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<ResponseDTO<String>>(`${this.userURL}/profile-photo`, formData, { headers: headers });
  }

  public upgradeToHost(): Observable<ResponseDTO<string>> {
    const token= this.tokenService.getToken();
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    });
    return this.http.patch<ResponseDTO<string>>(`${this.userURL}/host`, {}, { headers: headers });
  }

  public getHostById(): Observable<ResponseDTO<HostDTO>> {
    const token= this.tokenService.getToken();
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    });
    return this.http.get<ResponseDTO<HostDTO>>(`${this.userURL}/host`, { headers: headers });
  }
  
  public updateHost(UpdateProfileHostDTO: UpdateProfileHostDTO): Observable<ResponseDTO<UpdateProfileHostDTO>> {
    const token= this.tokenService.getToken();
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    });
    return this.http.put<ResponseDTO<UpdateProfileHostDTO>>(`${this.userURL}/host`, UpdateProfileHostDTO, { headers: headers });
  }

  public upgradeToGuest(): Observable<ResponseDTO<string>>{
    const token= this.tokenService.getToken();
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    });
    return this.http.patch<ResponseDTO<string>>(`${this.userURL}/guest`, {}, { headers: headers });
  }

  public deleteUserAccount(): Observable<ResponseDTO<string>> {
    const token= this.tokenService.getToken();
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    });
    return this.http.delete<ResponseDTO<string>>(`${this.userURL}`, { headers: headers });
  }




  
}
