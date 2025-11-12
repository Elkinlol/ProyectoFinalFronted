import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { max } from 'rxjs';
import { Header } from "../../components/header/header";
import { MapService } from '../../services/map-service';

@Component({
  selector: 'app-create-listing',
  imports: [ReactiveFormsModule, Header],
  templateUrl: './create-listing.html',
  styleUrl: './create-listing.css',
})

export class CreateListing {
  createListingForm!: FormGroup;
  cities: string[];

  constructor(private formBuilder: FormBuilder, private mapService: MapService) {
    this.cities = [];
  }

  ngOnInit() {
    this.mapService.create('map'); 
    this.cities = ['Bogotá', 'Medellín', 'Cali', 'Armenia', 'Cartagena'];
    this.createForm();

    this.mapService.addMarker().subscribe((coords) => {
    this.createListingForm.patchValue({
      longitude: coords.lng,
      latitude: coords.lat
    });
    });



  }
  private createForm() {
    this.createListingForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0)]],
      maxGuests: ['', [Validators.required, Validators.min(1)]],
      adress: ['', [Validators.required, Validators.maxLength(200)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      longitude: ['', [Validators.required, Validators.min(1)]],
      latitude: ['', [Validators.required, Validators.min(1)]],
      images: [[], [Validators.required]]
    });
  }
  public createListing() {
    console.log(this.createListingForm.value);
  }
}
