import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  imports: [ReactiveFormsModule],
  templateUrl: './recover-password.html',
  styleUrl: './recover-password.css',
})
export class RecoverPassword {
  recoverPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.createForm();
  }
  private createForm() {
    this.recoverPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  public recoverPassword() {
    console.log(this.recoverPasswordForm.value);
  }
}
