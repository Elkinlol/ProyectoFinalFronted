import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';
import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  public imageURL = "http://localhost:8082/api/images";

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public uploadImage(file: File): Observable<ResponseDTO<String>> {
    const token= this.tokenService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<ResponseDTO<String>>(`${this.imageURL}`, formData, { headers: headers } );
  }
  
}
