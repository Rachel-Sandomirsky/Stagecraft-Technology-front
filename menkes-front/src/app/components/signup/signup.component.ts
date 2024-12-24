import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/services/modal.service'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @Output() openLogin = new EventEmitter<void>(); // לפתיחת הטשטוש
  @Output() closeModal = new EventEmitter<void>(); // לסגירת הטשטוש

  signupForm: FormGroup;
  errorMessage: string | null = null;
  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private modalService: ModalService 
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
      const { username, email, password } = this.signupForm.value;

      this.userService.sendVerificationCode({ username, email, password }).subscribe(
        (response) => {
          this.closeModal.emit(); // סוגר את הטשטוש
          this.router.navigate(['/verify-email'], {
            queryParams: { username, email, password },
          });
        },
        (error) => {
          console.log('Error:', error);
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
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => {
      window.history.replaceState({}, '', '/');
    });
  }
  

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = <HTMLInputElement>document.getElementById('password');
    passwordField.type = this.isPasswordVisible ? 'text' : 'password';
  }

 
  onClose() {
    this.closeModal.emit(); // מודיע ל-AppComponent לסגור את הטשטוש
    this.router.navigate(['/'], { skipLocationChange: true });
  }

  navigateToLogin() {
    this.modalService.switchModalType('login');
  }
}
