import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  changePasswordForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    console.log('ChangePassword component initialized');
  }
  private createForm() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

  public changePassword() {
    console.log(this.changePasswordForm.value);
  }

}
