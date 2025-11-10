import { Component } from '@angular/core';
import { Search } from "../../components/search/search";
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-main-page-guest',
  imports: [Search, Header],
  templateUrl: './main-page-guest.html',
  styleUrl: './main-page-guest.css',
})
export class MainPageGuest {

}
