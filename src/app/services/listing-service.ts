import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpClientXsrfModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../models/response-dto';
import { TokenService } from './token-service';
import { PlaceDTO } from '../models/place-dto';
import { Page } from '../models/page';
import { UpdateListingDTO } from '../models/update-listing-dto';
import { SearchListing } from '../models/search-listing';


@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private listingURL= 'http://localhost:8082/api/listings';

  constructor(private http: HttpClient, private tokenService : TokenService) {}

  public createListing(listing: PlaceDTO): Observable<ResponseDTO<PlaceDTO>> {
    const token= this.tokenService.getToken();

    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    };
    return this.http.post<ResponseDTO<PlaceDTO>>(`${this.listingURL}`, listing, { headers: headers } );
  }

  public uploadImage( listingId: string ,files: File[] | FileList): Observable<ResponseDTO<String>> {
    const token= this.tokenService.getToken();
    const headers = {
    'Authorization': `Bearer ${token}`
    };
    const formData = new FormData();
    const fileArray = Array.isArray(files) ? files : Array.from(files);
    fileArray.forEach(files => formData.append('files', files, files.name));
    return this.http.post<ResponseDTO<String>>(`${this.listingURL}/${listingId}/images`, formData, { headers: headers } );
  }

  public getListings (page : number ): Observable <ResponseDTO<Page<PlaceDTO>>>{
    const token = this.tokenService.getToken();
    const headers ={
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    };

    const params = new HttpParams().set('page', page )
    return this.http.get<ResponseDTO<Page<PlaceDTO>>>(`${this.listingURL}`, {headers, params})
  }

  public deleteListing (id : string): Observable<ResponseDTO<String>>{
    const token = this.tokenService.getToken();
    const headers ={
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    };
    return this.http.delete<ResponseDTO<String>>(`${this.listingURL}/${id}`, {headers})
    
  }

  public getDetailListing (id: string): Observable<ResponseDTO<PlaceDTO>>{
    const token = this.tokenService.getToken();
    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    }
    return this.http.get<ResponseDTO<PlaceDTO>>(`${this.listingURL}/${id}`,{headers} )
  }

  public updateListing (id: string, updateListing: UpdateListingDTO): Observable<ResponseDTO<PlaceDTO>>{
    const token = this.tokenService.getToken();
    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    }
    return this.http.patch<ResponseDTO<PlaceDTO>>(`${this.listingURL}/${id}`, updateListing, {headers})
  }
  public searchByParameters(filters: SearchListing): Observable<ResponseDTO<Page<PlaceDTO>>>{
    let params = new HttpParams().set("page", filters.page);
    if (filters.city) params = params.set("city", filters.city);
    if (filters.checkIn) params = params.set("checkIn", filters.checkIn);
    if (filters.checkOut) params = params.set("checkOut", filters.checkOut);
    if (filters.nightlyPrice) params = params.set("nightlyPrice", filters.nightlyPrice);
    
    const token = this.tokenService.getToken();
    const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
    }
    return this.http.get<ResponseDTO<Page<PlaceDTO>>>(`${this.listingURL}/search`,  {headers, params})

  }

  private formatDate(date?: Date): string | undefined {
  return date ? date.toISOString().split("T")[0] : undefined;
}





  
}
