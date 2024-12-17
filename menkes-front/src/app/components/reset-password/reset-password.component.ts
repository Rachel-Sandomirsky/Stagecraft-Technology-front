import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup | null = null;  
  timer: number = 0;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required]], 
      newPassword: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  onSendCode() {
    if (this.resetPasswordForm && this.resetPasswordForm.valid) {
      
    }
  }


  onResetPassword() {
    if (this.resetPasswordForm && this.resetPasswordForm.valid) {
   
    }
  }
}
