import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  verificationCode: string = '';
  isCodeValid: boolean = false; // האם הקוד שהוזן תקין (בעל 5 תווים)
  isTimeExpired: boolean = false;
  minutesLeft: number = 10;
  secondsLeft: number = 0;
  private countdownInterval: any;
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username']; // שמירה של השם
      this.email = params['email']; // שמירה של המייל
      this.password = params['password']; // שמירה של הסיסמה
    });
    // שליחה לשרת לאימות קוד
    this.startTimer();
  }

  validateInput(): void {
    this.isCodeValid = this.verificationCode.length === 5;
  }

  verifyCode(): void {
    if (this.verificationCode.length === 5) {
      this.userService.verifyCode(this.email, this.verificationCode).subscribe(
        (response) => {
          alert('הקוד נכון! אימות הצליח.');

          this.userService.addUser( {username: this.username, email: this.email,password: this.password}).subscribe(
            (addUserResponse) => {
              alert('המשתמש נוסף בהצלחה!');
              this.router.navigate(['/login']); // או כל דף אחר שתרצי לנווט אליו
            },
            (error) => {
              alert('אירעה שגיאה בהוספת המשתמש');
            }
          );
        },
        (error) => {
          alert('הקוד שגוי. נסה שוב.');
        }
      );
    }
  }

  startTimer(): void {
    this.countdownInterval = setInterval(() => {
      if (this.secondsLeft === 0) {
        if (this.minutesLeft === 0) {
          this.isTimeExpired = true;
          clearInterval(this.countdownInterval);
        } else {
          this.minutesLeft--;
          this.secondsLeft = 59;
        }
      } else {
        this.secondsLeft--;
      }
    }, 1000);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }
}
