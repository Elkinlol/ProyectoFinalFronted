import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-code',
  imports: [ ReactiveFormsModule],
  templateUrl: './insert-code.html',
  styleUrl: './insert-code.css',
})
export class InsertCode {
  insertCodeForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    this.createForm();
  }

  private createForm() {
    this.insertCodeForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      newPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]]
    });
  }
  public insertCode() {
    console.log(this.insertCodeForm.value);
  }

}
