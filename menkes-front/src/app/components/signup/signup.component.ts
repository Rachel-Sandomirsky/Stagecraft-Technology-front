import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.userService.createUser(user).subscribe(
        (response) => {
          // אחרי הרשמה מוצלחת, ניווט לדף הלוגין
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Error:', error); // הוספת הדפסה של השגיאה
          if (error.error.message === 'המייל כבר קיים במערכת') {
            this.errorMessage = 'המייל כבר קיים במערכת';
          } else {
            this.errorMessage = 'אירעה שגיאה במהלך ההרשמה';
          }
        }
      );
    }
  }
  

  goBack() {
    this.location.back();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = <HTMLInputElement>document.getElementById('password');
    passwordField.type = this.isPasswordVisible ? 'text' : 'password';
  }
}
