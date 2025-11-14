import { Component, input, Input, signal } from '@angular/core';
import { PlaceDTO } from '../../models/place-dto';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-place',
  imports: [ RouterLink],
  templateUrl: './card-place.html',
  styleUrl: './card-place.css',
})
export class CardPlace {
    places = input<PlaceDTO[]>(); 

  constructor(private router: Router){}







}
