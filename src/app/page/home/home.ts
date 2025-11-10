import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";

@Component({
  selector: 'app-home',
  imports: [Header, Search],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
