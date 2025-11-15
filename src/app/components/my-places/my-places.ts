import { Component, signal } from '@angular/core';
import { PlaceDTO } from '../../models/place-dto';
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';
import { Header } from "../header/header";
import { ListingService } from '../../services/listing-service';
import { TokenService } from '../../services/token-service';
import { Pagination } from "../pagination/pagination";

import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-my-places',
  imports: [RouterLink, Header, Pagination],
  templateUrl: './my-places.html',
  styleUrl: './my-places.css'
})
export class MyPlaces {

  places = signal<any[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  id!: string
  listing: PlaceDTO | undefined;

  constructor( private listingService : ListingService, private tokenService: TokenService,
    private router: Router, private activitedRoute: ActivatedRoute
   ) {
    this.activitedRoute.params.subscribe( (params)=>{
      this.id= params ["id"];
    });
    
    this.loadListings(0);
  }


  public loadListings(page: number) {
    this.listingService.getListings(page).subscribe({
      next: (res) => {
        console.log('raw response', res); 
        const pageData = res.data;
        this.places.set(pageData.content || []);
        this.currentPage.set(pageData.number ?? page); 
        this.totalPages.set(pageData.totalPages ?? 1);
      },
      error: (err) => console.error(err)
    });
  }


public onDelete(id:string) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el alojamiento permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Eliminando alojamiento con ID:', id)
      this.listingService.deleteListing(id).subscribe({
        next: (res) => {
          Swal.fire('Eliminado', res.message, 'success');
          // recargamos la página actual de alojamientos
          this.loadListings(this.currentPage());
          this.router.navigate(['my-places'])
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo eliminar el alojamiento', 'error');
          }
        });
      }
    });
  }
  public onViewReserves(id:String){
    
  }


  onPageChange(page: number) {
  this.currentPage.set(page); // si es un signal
  this.loadListings(page);
}
}