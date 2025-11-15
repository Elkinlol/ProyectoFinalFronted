import { Component, output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-reservs',
  imports: [ReactiveFormsModule],
  templateUrl: './search-reservs.html',
  styleUrl: './search-reservs.css',
})
export class SearchReservs {
  searchReservForm!:FormGroup
  filtersChange = output<any>();

  constructor(private formBuilder:FormBuilder){
  }
    private createForm() {
    this.searchReservForm = this.formBuilder.group({
      state: [''],
      checkIn: [''],
      checkOut: [''],
      page: [''],
    });
  }

  
  ngOnInit() {
    this.createForm(); 
  }

  public search(){
    const filters = this.searchReservForm.value;
    const reservData = {
      checkIn: filters.checkIn ? filters.checkIn + "T15:00:00" : null,
      checkOut: filters.checkOut ? filters.checkOut + "T11:00:00" : null,
      state: filters.state,
      page: filters.page ?? ""
  };
    
    this.filtersChange.emit(reservData);

  }

}
