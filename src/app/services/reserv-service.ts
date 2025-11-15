import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ResponseDTO } from '../models/response-dto';
import { CreateReserveDTO } from '../models/create-reserve-dto';
import { ReserveDTO } from '../models/reserve-dto';
import { Observable } from 'rxjs';
import { TokenService } from './token-service';
import { SearchReservsDTO } from '../models/search-reservsDTO';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class ReservService {
  private reservUrl= 'http://localhost:8082/api/reserves';

  constructor(private httpClient: HttpClient
    , private tokenService:TokenService
  ){

  }
  

  public createReserv(listingId: string, createReserv: CreateReserveDTO): Observable<ResponseDTO<ReserveDTO>>{
    const token = this.tokenService.getToken();
    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    };

    return this.httpClient.post<ResponseDTO<ReserveDTO>>(`${this.reservUrl}/${listingId}`, createReserv, { headers: headers } );
  }

  public searchReservs(filters:SearchReservsDTO):Observable<ResponseDTO<Page<ReserveDTO>>>{
    let params = new HttpParams().set("page", filters.page);


    if (filters.estado) params = params.set("estado", filters.estado);
    if (filters.checkIn) params = params.set("checkIn", filters.checkIn);
    if (filters.checkOut) params = params.set("checkOut", filters.checkOut);


    const token = this.tokenService.getToken();
    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    };

    return this.httpClient.get<ResponseDTO<Page<ReserveDTO>>>(`${this.reservUrl}`,{ headers: headers, params} )
  }

  public searchListingReservFromHost(listingId: string, page: number):Observable<ResponseDTO<Page<ReserveDTO>>>{
    
    const token = this.tokenService.getToken();
    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    };

    let params= new HttpParams().set("page", page)
    return this.httpClient.get<ResponseDTO<Page<ReserveDTO>>>(`${this.reservUrl}/${listingId}/host`,{headers: headers, params})
  }

  public deleteReserv(id:string):Observable<ResponseDTO<string>>{
    const token = this.tokenService.getToken();
    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    };
    return this.httpClient.delete<ResponseDTO<string>>(`${this.reservUrl}/${id}`, {headers:headers})
  }
  
}
