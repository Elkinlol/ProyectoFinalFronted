import { Component, signal } from '@angular/core';
import { Pagination } from '../../components/pagination/pagination';
import { Header } from '../../components/header/header';
import { SearchReservs } from "../../components/search-reservs/search-reservs";
import Swal from 'sweetalert2';
import { ReservService } from '../../services/reserv-service';
import { ReserveDTO } from '../../models/reserve-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-reservs',
  imports: [Pagination, Header, SearchReservs],
  templateUrl: './my-reservs.html',
  styleUrl: './my-reservs.css',
})
export class MyReservs {
  reservs: ReserveDTO[] = [];
  currentPage = 0;
  totalPages = 0;
  filters: any = {};
  id!: string

  
  constructor(private reserveService: ReservService, private activedRoutes:ActivatedRoute, private route: Router){
  }


  ngOnInit(){}

  onFiltersChange(filters: any){
    this.filters = filters;
    this.currentPage = 0;
    this.fetch();  

  }
  public onDelete(reservId:string){
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la reserva permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
    if (result.isConfirmed) {
      this.reserveService.deleteReserv(reservId).subscribe({
        next: (res) => {
          Swal.fire('Eliminado', res.message, 'success');
          
          this.fetch();
          this.route.navigate(['my-reservs'])
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo eliminar el alojamiento', 'error');
          }
        });
      }
    });
    




  }



  fetch(){
    
    const params = {
      ...this.filters,
      page: this.currentPage ?? 0
    };
    console.log(this.filters)
    this.reserveService.searchReservs(params).subscribe({
      next: (res) => {
        const page = res.data;{}
        console.log(page)
        this.reservs = page.content || [];
        this.totalPages = page.totalPages ?? 0;
        console.log('Recibido page:', page);
      },
      error: (err) => {
        console.error('Error al traer listados', err);
      }
    });
  }


  onPageChange(page: number) {
  this.currentPage= page; 
  this.fetch()
  }

}
