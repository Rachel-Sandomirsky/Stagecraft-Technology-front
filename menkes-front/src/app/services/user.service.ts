import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private resetCode: number | null = null;
  private expirationTime: number | null = null;
  public userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private apiUrl = environment.apiUrl; // apiUrl כללית

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

  // פונקציה לשליחת קוד אימות למייל
  sendPasswordResetCode(email: string): Observable<any> {
    return this.apiService.post(`${this.apiUrl}/users/password_reset_code`, { email }).pipe(
      tap((response: any) => {
        this.resetCode = response.resetCode;
        this.expirationTime = Date.now() + 5 * 60 * 1000;
      })
    );
  }

  // פונקציה לאימות קוד האימות
  verifyResetCode(code: number): boolean {
    if (this.resetCode === null || this.expirationTime === null) {
      return false;
    }

    if (this.resetCode === code && this.expirationTime > Date.now()) {
      return true;
    } else {
      return false;
    }
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

  // יצירת משתמש חדש
  createUser(user: User): Observable<User> {
    return this.apiService.post<User>(`${this.apiUrl}/sign-up`, user); // עדכון לנתיב '/sign-up'
  }

  getUserByCode(code: string): Observable<User> {
    return this.apiService.get<User>(`${this.apiUrl}/users/${code}`);
  }

  // בדיקת תפקיד המשתמש
  getRole(): string {
    const user = this.userSubject.getValue();
    if (user) {
      return user.role;
    }
    return ''; // החזרת ה-Role הנוכחי
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
