import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ListingService } from '../../services/listing-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  isHost: boolean = false;
  searchForm!: FormGroup;
  results: any;
  filtersChange = output<any>();

  constructor(private fb: FormBuilder, private listingService: ListingService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.searchForm = this.fb.group({
      city: [''],
      checkIn: [''],
      checkOut: [''],
      nightlyPrice: [''],
    });

  }
    submitFilters() {
    console.log("BOTÓN FUNCIONA — estos son los filtros:", this.searchForm.value);
    const filters = this.searchForm.value;
    this.filtersChange.emit(filters);
  }

}
