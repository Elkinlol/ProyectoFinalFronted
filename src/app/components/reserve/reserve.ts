import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../services/token-service';
@Component({
  selector: 'app-reserve',
  imports: [ReactiveFormsModule],
  templateUrl: './reserve.html',
  styleUrl: './reserve.css',
})

export class Reserve  {
  reserveForm!: FormGroup;
  isHost:boolean=false;

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService) {
    this.createForm();
  }

  ngOnInit() {
    const rol = this.tokenService.getRole();
    if(rol=== 'HOST'){
      this.isHost = true;
    }
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
    if(this.isHost){
      return;
    }

  }

}
