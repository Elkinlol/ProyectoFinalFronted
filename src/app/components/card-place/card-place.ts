import { Component, input, Input } from '@angular/core';
import { PlaceDTO } from '../../models/place-dto';

@Component({
  selector: 'app-card-place',
  imports: [],
  templateUrl: './card-place.html',
  styleUrl: './card-place.css',
})
export class CardPlace {
  place = input< PlaceDTO | null>();

  getImage(): string {
    return this.place()?.images[0] || '';
  }

}
