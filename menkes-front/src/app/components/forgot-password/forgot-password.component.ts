import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  step: number = 1;
  emailForm: FormGroup;
  codeForm: FormGroup;
  resetPasswordForm: FormGroup;

  // משתנה לשמירת המייל
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onEmailSubmit() {
    if (this.emailForm.valid) {
      this.email = this.emailForm.value.email; // שמירת המייל במשתנה
      // קריאה לשירות לבדוק אם המשתמש קיים
      this.userService.getUserByEmail(this.email).subscribe(
        () => {
          this.userService.sendCodeToEmail(this.email).subscribe(
            () => {
              alert('קוד אימות נשלח למייל');
              this.step = 2;
            },
            (err) => alert('ארעה שגיאה בשליחה למייל')
          );
        },
        (err) => {
          alert('מייל לא רשום');
        }
      );
    }
  }

  onCodeSubmit() {
    if (this.codeForm.valid) {
      const code = this.codeForm.value.code; // קבלת ערך השדה code מתוך הטופס
      this.userService.verifyCodeInFoerget(this.email, code).subscribe(
        () => {
          alert('קוד אומת בהצלחה'), (this.step = 3);
        },
        (err) => {
          alert('קוד לא נכון');
        }
      );
    }
  }

  onResetPasswordSubmit() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;
      if (newPassword === confirmPassword) {
        this.userService
          .resetPassword(this.email, newPassword)
          .subscribe(() => {
            alert('סיסמא הוחלפה בהצלחה'),
              this.router.navigate(['/login']),
              (err: any) => {
                alert(err);
              };
          });
      } else {
        alert('סיסמאות לא זהות');
      }
    }
  }
}
