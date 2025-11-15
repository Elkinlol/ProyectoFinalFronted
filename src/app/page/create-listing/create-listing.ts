import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { max } from 'rxjs';
import { Header } from "../../components/header/header";
import { MapService } from '../../services/map-service';
import { ListingService } from '../../services/listing-service';
import { PlaceDTO } from '../../models/place-dto';
import { TokenService } from '../../services/token-service';
import {ImageService} from"../../services/image-service";
import { Enums } from '../../services/enums';


@Component({
  selector: 'app-create-listing',
  imports: [ReactiveFormsModule, Header],
  templateUrl: './create-listing.html',
  styleUrl: './create-listing.css',
})

export class CreateListing {
  createListingForm!: FormGroup;
  addressFormGroup!: FormGroup;
  cities: string[];
  imagePlace: File | null = null;
  services: string[]
  selectedServices: string[] = []; 

  constructor(private formBuilder: FormBuilder, private mapService: MapService,
     private listingService: ListingService, private tokenService: TokenService,
      private imageService: ImageService, private enums: Enums ) {
    this.cities = [];
    this.services = [];
  }

  ngOnInit() {
    this.mapService.create('map'); 
    this.cities = ['Bogotá', 'Medellín', 'Cali', 'Armenia', 'Cartagena'];
    this.enums.getServices().subscribe({
     next: (services) => {
    console.log('Servicios recibidos:', services);
    this.services = services
  },
  error: (err) => console.error('Error cargando servicios:', err) });
    this.createForm();


    this.mapService.addMarker().subscribe((coords) => {
    this.createListingForm.patchValue({
      adress: {
        latitud: coords.lat,
        longitud: coords.lng
      }
    });
    });
  }


  private createForm() {
    this.createListingForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      nightlyPrice: ['', [Validators.required, Validators.min(0)]],
      maxGuest: ['', [Validators.required, Validators.min(1)]],
      adress: this.formBuilder.group({
        city: ['', [Validators.required]],
        adress: ['', [Validators.required, Validators.maxLength(200)]],
        latitud: ['', [Validators.required]],
        longitud: ['', [Validators.required]],
      }),
      images: [[], []],
      services: []
    });
  }
  public createListing() {

    if (!this.imagePlace) {
    alert('Debes subir al menos una imagen');
    return;
    }

    this.imageService.uploadImage(this.imagePlace).subscribe({
      next: (response) => {
      
      const listingData = this.createListingForm.value;
      listingData.images = [response.data]; 
      listingData.services = this.selectedServices;
      console.log("Este es el formulario", this.createListingForm)
      this.listingService.createListing(listingData).subscribe({
        next: (res) => {
          console.log(res.data)
          alert('Alojamiento creado con éxito');
        },
        error: (err) => {
          console.error('Error creating listing:', err);
          alert('Error al crear el alojamiento');
        }
      });
    },
    error: (err) => {
      console.error('Error uploading image:', err);
      alert('Error al subir la imagen');
      }
    });
  }

  public onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const files = Array.from(input.files);
    this.imagePlace = files[0];
    }
  }
  onServiceChange(event: any) {
    const service = event.target.value;
    if (event.target.checked) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices = this.selectedServices.filter(s => s !== service);
    }
  }


}