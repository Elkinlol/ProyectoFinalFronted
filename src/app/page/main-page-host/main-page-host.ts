import { Component } from '@angular/core';
import { Search } from "../../components/search/search";
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-main-page-host',
  imports: [Search, Header],
  templateUrl: './main-page-host.html',
  styleUrl: './main-page-host.css',
})
export class MainPageHost {

}
