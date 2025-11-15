import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { PromotionService } from '../../services/promotion-service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-promotion',
  imports: [Header, ReactiveFormsModule],
  templateUrl: './create-promotion.html',
  styleUrl: './create-promotion.css',
})


export class CreatePromotion {
  id!: string
  promoForm!: FormGroup;

  constructor(private promotionService:PromotionService, private activatedRoute:ActivatedRoute, 
    private formBuilder:FormBuilder){
  }

  ngOnInit(){
    {
    this.activatedRoute.params.subscribe( (params)=>{
      this.id= params ["id"];
    });
    }
    this.createForm();
  }

  public createForm(){
      this.promoForm = this.formBuilder.group({
      createdAt: ['', [Validators.required]],
      expirationDate: ['', Validators.required],
      promotion: [1, [Validators.required, Validators.min(1)]],
      code: ['']
    });
  }


  public createPromotion(){
    const data = this.promoForm.value;
    this.promotionService.createPromotion(this.id, data).subscribe({
      next:(res)=>{
        this.promoForm.reset()
        Swal.fire({
            title: 'cupon creada con éxito',
            text: 'Tu cupon ha sido registrada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'

        })
      }, error: (err)=>{
        Swal.fire('Error', 'No se pudo crear la reserva', 'error');
      }
    })
  }
}
