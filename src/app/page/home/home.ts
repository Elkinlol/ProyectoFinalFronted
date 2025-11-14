// home.ts
import { Component, signal } from '@angular/core';
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardPlace } from "../../components/card-place/card-place";
import { Pagination } from "../../components/pagination/pagination";
import { ListingService } from '../../services/listing-service';
import { PlaceDTO } from '../../models/place-dto';
import { ListingSearch } from '../../models/listing-search';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Search, Pagination, CardPlace],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  places: PlaceDTO[] = [];
  filters: any = {};
  currentPage = 0;
  totalPages = 0;
  searchForm: any;

  constructor(private listingService: ListingService) {}

  onFiltersChange(filters: any) {
    console.log("RECIBIDO EN HOME:", filters);
    this.filters = filters;
    this.currentPage = 0;
    this.fetch();  
  }

  
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetch();
  }

  fetch() {
    const params = {
      ...this.filters,
      page: this.currentPage
    };
    this.listingService.searchByParameters(params).subscribe({
      next: (res) => {
        const page = res.data;{}
        console.log(page)
        this.places = page.content || [];
        this.totalPages = page.totalPages ?? 0;
        console.log('Recibido page:', page);
      },
      error: (err) => {
        console.error('Error al traer listados', err);
      }
    });
  }
}
