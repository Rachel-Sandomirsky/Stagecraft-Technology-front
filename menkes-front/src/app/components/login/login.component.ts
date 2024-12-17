import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';  // שירות המשתמש שלך
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.userService.getUserByEmailAndPass(credentials.email, credentials.password).subscribe(
        (response: User) => {
          console.log('username: ' + response.access_token);
          if (response && response.access_token) {
            this.router.navigate(['/']);
            this.errorMessage = null;
            // ניווט לדף האחרון
          } else {
            this.errorMessage = 'שגיאה בהתחברות';
          }
        },
        (err) => {
          this.errorMessage = err.error?.message || 'שגיאה כללית בהתחברות.';
        }
      );
    }
  }


  onForgotPassword(): void {
    this.router.navigate(['/reset-password']);
  }

  goBack() {
   
    if (window.history.length > 1) {
      this.location.back();
    } else {
   
      this.router.navigate(['/courses']);
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = <HTMLInputElement>document.getElementById('password');
    passwordField.type = this.isPasswordVisible ? 'text' : 'password';
  }
}
