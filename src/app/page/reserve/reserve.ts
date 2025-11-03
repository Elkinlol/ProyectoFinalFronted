import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-reserve',
  imports: [ReactiveFormsModule],
  templateUrl: './reserve.html',
  styleUrl: './reserve.css',
})

export class Reserve {
  reserveForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }
  private createForm() {
    this.reserveForm = this.formBuilder.group({
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
      guests: ['', [Validators.required, Validators.min(1)]],
      discountCode: ['',[]]
    });
  }
  public makeReservation() {
    console.log(this.reserveForm.value);
  }

}
