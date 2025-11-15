import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePromotionDto } from '../models/create/create-promotion-dto';
import { TokenService } from './token-service';
import { ResponseDTO } from '../models/response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {

  constructor(private tokenService : TokenService, private http:HttpClient){}

  private promotionURL= 'http://localhost:8082/api/promotion';

  public createPromotion (id: string, createPromotionDTO:CreatePromotionDto): Observable<ResponseDTO<string>>{
    const token = this.tokenService.getToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      }
      return this.http.post<ResponseDTO<string>>(`${this.promotionURL}/listings/${id}`,{headers} )
    }
  
  
}
