import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup | null = null;  // אתחול כאפס כדי למנוע גישה לפני אתחול
  timer: number = 0;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // אתחול הפורם עם Validators
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // שדה אימייל עם בדיקות תקינות
      code: ['', [Validators.required]], // שדה קוד
      newPassword: ['', [Validators.required, Validators.minLength(6)]] // שדה סיסמה חדשה
    });
  }

  // פונקציה לשליחת קוד אימות
  onSendCode() {
    if (this.resetPasswordForm && this.resetPasswordForm.valid) {
      // שליחה של בקשה לשרת לשלוח קוד
    }
  }

  // פונקציה לאיפוס סיסמה
  onResetPassword() {
    if (this.resetPasswordForm && this.resetPasswordForm.valid) {
      // שליחה של בקשה לשרת לאיפוס סיסמה
    }
  }
}
