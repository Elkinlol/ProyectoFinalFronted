import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import mapboxgl, { LngLatLike, Map, Marker, MapMouseEvent } from 'mapbox-gl';
import { MarkerDTO } from '../models/marker-dto';

@Injectable({
  providedIn: 'root',
})
export class MapService implements OnDestroy {

  private map?: Map;
  private markers: Marker[] = [];
  private currentLocation: LngLatLike = [-75.6727, 4.53252];
  private readonly MAPBOX_TOKEN = 'pk.eyJ1IjoiZWxraW5iZyIsImEiOiJjbWh3M3J0aHkwMzBrMmtvYzhhdHUwbXQ5In0.UQEVkcVO5itKQVgvsFXxyg';
  private destroy$ = new Subject<void>();

  constructor() {
    mapboxgl.accessToken = this.MAPBOX_TOKEN;
  }


  public create(containerId: string = 'map'): void {
    if (this.map) {
      this.map.remove(); 
    }

    this.map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLocation,
      zoom: 17,
      pitch: 45,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  public centerOnPlace(latitude: number, longitude: number): void {
  if (!this.map) return;

  // Limpia marcadores anteriores
  this.clearMarkers();

  // Nueva ubicación
  const target: LngLatLike = [longitude, latitude];

  // Centrar el mapa
  this.map.flyTo({
    center: target,
    zoom: 16,
    speed: 1.2,
    curve: 1,
    essential: true
  });

  // Dibujar marcador del alojamiento
  const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(target)
    .addTo(this.map!);

  this.markers.push(marker);
}

  /** Dibuja varios marcadores con popup */
  public drawMarkers(places: MarkerDTO[]): void {
    if (!this.map) return;

    places.forEach(({ id, title, photoUrl, latitude, longitude }) => {
      const popupHtml = `
        <strong>${title}</strong>
        <div>
          <img src="${photoUrl}" alt="Imagen" style="width: 100px; height: 100px;">
        </div>
        <a href="/place/${id}">Ver más</a>
      `;

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
        .addTo(this.map!);
    });
  }

  /** Devuelve el mapa actual (si existe) */
  public get mapInstance(): Map | undefined {
    return this.map;
  }

  /** Limpieza al destruir el servicio */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  public addMarker(): Observable<mapboxgl.LngLat> {
    return new Observable((observer) => {
      if (!this.map) {
        observer.error('Mapa no inicializado');
        return;
      }


      const onClick = (e: MapMouseEvent) => {
        this.clearMarkers();
        const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(e.lngLat)
        .addTo(this.map!);

        this.markers.push(marker);
      // Emite las coordenadas del marcador al observador
        observer.next(marker.getLngLat());
      };

        this.map.on('click', onClick);

    // Limpieza al desuscribirse
        return () => {
          this.map?.off('click', onClick);
            };
          });
        }

  private clearMarkers(): void {
    this.markers.forEach((marker) => marker.remove()); // elimina los marcadores del mapa
  this.markers = []; // limpia el arreglo de marcadores
  }
}