import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaceDTO } from '../models/place-dto';
import { ResponseDTO } from '../models/response-dto';


@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private listingUrl= 'http://localhost:8082/api/listings';


  
}
