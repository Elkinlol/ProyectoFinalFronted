import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { Pagination } from '../../components/pagination/pagination';
import { ReserveDTO } from '../../models/reserve-dto';
import Swal from 'sweetalert2';
import { ReservService } from '../../services/reserv-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-listings-reserves',
  imports: [Header, Pagination],
  templateUrl: './my-listings-reserves.html',
  styleUrl: './my-listings-reserves.css',
})
export class MyListingsReserves {
    reservs = signal<any>(null);
    currentPage = 0;
    totalPages = 0;
    filters: any = {};
    id!: string

    constructor(private reserveService:ReservService, private activatedRoute:ActivatedRoute){

    }
    
    ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadReservs(this.id, this.currentPage);
    });
  }


  public loadReservs(id: string ,page:number){
    this.reserveService.searchListingReservFromHost(id,page).subscribe({
      next:(res)=>{
        const p = res.data.content;
        this.reservs.set(p)
      },
      error:(err)=>{
        Swal.fire('Error', 'No se pudo crear la reserva', 'error');
      }
    })

  }

  onPageChange(page: number) {
  this.currentPage= page; 
  this.loadReservs(this.id, page);
  }

}
