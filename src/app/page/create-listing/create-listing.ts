import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { max } from 'rxjs';

@Component({
  selector: 'app-create-listing',
  imports: [ReactiveFormsModule],
  templateUrl: './create-listing.html',
  styleUrl: './create-listing.css',
})

export class CreateListing {
  createListingForm!: FormGroup;
  cities: string[];

  constructor(private formBuilder: FormBuilder) { 
    this.cities = ['Bogotá', 'Medellín', 'Cali', 'Armenia', 'Cartagena'];
    this.createForm();
  }
  private createForm() {
    this.createListingForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0)]],
      maxGuests: ['', [Validators.required, Validators.min(1)]],
      adress: ['', [Validators.required, Validators.maxLength(200)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      length: ['', [Validators.required, Validators.min(1)]],
      latitude: ['', [Validators.required, Validators.min(1)]],
      images: [[], [Validators.required]]
    });
  }
  public createListing() {
    console.log(this.createListingForm.value);
  }
}
