import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../services/token-service';
import { ReservService } from '../../services/reserv-service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reserve',
  imports: [ReactiveFormsModule],
  templateUrl: './reserve.html',
  styleUrl: './reserve.css',
})

export class Reserve  {
  reserveForm!: FormGroup;
  isHost:boolean=false;
  id!:string
  message!:String

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService,
    private reservService: ReservService, private activitedRoute: ActivatedRoute
  ) {


    this.createForm();
      this.activitedRoute.params.subscribe((params)=>{
      this.id= params ["id"];
    });
  }

  private createForm(){
     this.reserveForm = this.formBuilder.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]],
      discountCode: ['']
    });
  }

  ngOnInit() {
  }



  public makeReservation() {

      const formValues = this.reserveForm.value
      const reservData = {
        checkIn: (formValues.checkIn ?? "") + "T15:00:00",
        checkOut: (formValues.checkOut ?? "") + "T11:00:00",
        guestCount: formValues.guests,
        discountCode: formValues.discountCode ?? ""
  };
      this.reservService.createReserv(this.id, reservData).subscribe({
      next: (res) => {
        
        this.reserveForm.reset();
        Swal.fire({
        title: 'Reserva creada con éxito',
        text: 'Tu reserva ha sido registrada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
});
      },
      error: (err) => {
          console.error('Error creating listing:', err);
          Swal.fire('Error', 'No se pudo crear la reserva', 'error');
      }
    });
  }

  }

