import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../../services/listing-service';
import { CommonModule } from '@angular/common';
import { Header } from "../header/header";
import { Comments } from '../comments/comments';
import { MapService } from '../../services/map-service';
import { Reserve } from "../reserve/reserve";
import { TokenService } from '../../services/token-service';

@Component({
  selector: 'app-place-detail',
  standalone: true,
  imports: [CommonModule, Header, Comments, Reserve],
  templateUrl: './detail-listing.html',
  styleUrl: './detail-listing.css'
})
export class PlaceDetail {

  id = signal<string>('');
  place = signal<any>(null);
  isHost = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private mapService: MapService,
    private tokenService: TokenService
  ) {
    this.route.params.subscribe(params => {
      this.id.set(params['id']);
      this.loadPlace(this.id());
    });
  }

    ngOnInit(): void {
      const rol = this.tokenService.getRole()
      if(rol==='HOST'){
        this.isHost.set(true);
      }else{
        this.isHost.set(false);
      }
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log("ID recibido en detalle:", id);

      if (id) {
        this.id.set(id);
        this.loadPlace(id);
      }
    });
  }

ngAfterViewInit() {
  const interval = setInterval(() => {
    const el = document.getElementById('map-detail');
    if (el && this.place()) {

      clearInterval(interval);
      this.mapService.create('map-detail');

      // Esperar a que el mapa cargue
      this.mapService.mapInstance?.on('load', () => {
        const lat = Number(this.place().adress.latitud);
        const lng = Number(this.place().adress.longitud);

        this.mapService.centerOnPlace(lat, lng);

        setTimeout(() => {
          this.mapService.mapInstance?.resize();
        }, 200);
      });

    }
  }, 50);
}



public loadPlace(id: string) {
  this.listingService.getDetailListing(id).subscribe({
    next: (res) => {
      const p = res.data;
      this.place.set(p);


      const lat = Number(p.adress.latitud);
      const lng = Number(p.adress.longitud);
      console.log("longitud:", p.adress.longitud, "latitud:" ,p.adress.latitud)
      this.mapService.centerOnPlace(lng, lat);
    },
    error: err => console.error(err)
  });
}


}
