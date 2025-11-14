import { Component, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../../services/listing-service';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-edit-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './edit-listing.html',
  styleUrl: './edit-listing.css',
})
export class EditListing  {

  listing = signal<any>(null);
  form!: FormGroup;
  id = signal<string>('');
  selectedImages: File[] = [];
  uploadedUrls: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private listingService: ListingService
  ) {
    this.route.params.subscribe(params => {
      this.id.set(params['id']);
      this.loadPlace(this.id());
    });
  }



  private loadForm() {
    const p = this.listing();

    this.form = this.fb.group({
      title: [p.title, ],
      description: [p.description, ],
      nightlyPrice: [p.nightlyPrice, ],
      maxCapacity: [p.maxGuest, ]
    });
    
  }

  selectImages(event: any) {
    this.selectedImages = Array.from(event.target.files); // convierte FileList a File[]
  }

  public update() {
    if (!this.form.valid) return;

    const id = this.listing().id;

    const dto = this.form.value;
    console.log(this.form)

    this.listingService.updateListing(id, dto).subscribe({
      next: (res) => {
        if (this.selectedImages.length > 0) {
        }
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedImages = Array.from(event.target.files); // FileList -> File[]
  }

  // Método principal para subir imágenes
  uploadSelectedImages(id: string) {
    if (!this.selectedImages || this.selectedImages.length === 0) {
      console.warn('No hay imágenes seleccionadas');
      return;
    }

    this.listingService.uploadImage(id, this.selectedImages)
      .subscribe({
        next: (res) => {
          console.log('Imágenes subidas correctamente:', this.uploadedUrls);
        },
        error: err => {
          console.error('Error al subir imágenes:', err);
        }
      });
  }


  private loadPlace(id : string) {
    
    this.listingService.getDetailListing(id).subscribe(res => {
    console.log(res)
    this.listing.set(res.data);
    this.loadForm();
    });
  }
}

