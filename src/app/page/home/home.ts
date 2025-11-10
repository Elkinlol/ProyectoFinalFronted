import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { PlaceDTO } from '../../models/place-dto';
import { CardPlace } from "../../components/card-place/card-place";

@Component({
  selector: 'app-home',
  imports: [Header, Search, CardPlace],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  places: PlaceDTO[] = [];
}
