
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;  // apiUrl כללית
  private resetCode: number | null = null;
  private expirationTime: number | null = null;
  public userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.restoreUserFromStorage(); // שחזור משתמש בעת טעינת האפליקציה
  }

  // שחזור משתמש מ-localStorage
  private restoreUserFromStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.userSubject.next(user);
    }
  }
 
  // שליחת קוד אימות למייל
  sendVerificationCode(signUpData: { username: string; email: string; password: string }): Observable<any> {
    alert('email :'+signUpData.email)
    return this.apiService.post(`${this.apiUrl}/sign-up/check-and-send`,signUpData);
  }

  // אימות קוד שנשלח למייל
  verifyCode(email: string, code: string): Observable<any> {
    return this.apiService.post(`${this.apiUrl}/sign-up/verify-code`, { email, code });
  }

  // הוספת משתמש לאחר אימות קוד
  addUser(signUpData: { username: string; email: string; password: string }): Observable<any> {
    return this.apiService.post(`${this.apiUrl}/sign-up/add-user`, signUpData);
  }

  // התחברות של משתמש
  getUserByEmailAndPass(email: string, password: string): Observable<User> {
    return this.apiService.post<User>(`${this.apiUrl}/auth`, { email, password }).pipe(
      tap((user) => {
        console.log('user: ' + user.username);
        console.log('role: ' + user.role);
        this.userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user)); // שמירת המשתמש
      })
    );
  }

  // פרטי המשתמש הנוכחי
  getUser(): User | null {
    return this.userSubject.getValue();
  }
  // יציאה מהמערכת
  public logout(): void {
    const user = this.userSubject.getValue(); // שליפת הערך הנוכחי של המשתמש
    if (user && user.email && user.access_token) {
      this.apiService.post<any>(`${this.apiUrl}/logout`, {
        email: user.email,
        token: user.access_token,
      }).subscribe({
        next: (response) => {
          console.log('Logout successful:', response.message);
          this.userSubject.next(null);
          localStorage.removeItem('user'); // מחיקת המשתמש מה-localStorage
        },
        error: (err) => {
          console.error('Error during logout:', err.error?.message || err.message);
        },
      });
    } else {
      console.error('User or token not found.');
    }
  }

  getUserByCode(code: string): Observable<User> {
    return this.apiService.get<User>(`${this.apiUrl}/users/${code}`);
  }

  // אימות טוקן מול השרת בעת טעינת האפליקציה מחדש
  validateToken(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.apiService.post<any>(`${this.apiUrl}/auth/validate-token`, { token: user.access_token })
        .subscribe({
          next: (response) => this.userSubject.next(response.user),
          error: () => this.logout(),
        });
    }
  }
   
  }

 


