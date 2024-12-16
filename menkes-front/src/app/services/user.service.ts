import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private resetCode: number | null = null;
  private expirationTime: number | null = null;

  private apiUrl = 'http://localhost:3000';  // apiUrl כללית

  constructor(private http: HttpClient) {}

  // פונקציה לשליחת קוד אימות למייל
  sendPasswordResetCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/password_reset_code`, { email }).pipe(
      tap((response: any) => {
        this.resetCode = response.resetCode;  // שומר את קוד האימות
        this.expirationTime = Date.now() + 5 * 60 * 1000;  // שומר את זמן התוקף
      })
    );
  }

  // פונקציה לאימות קוד האימות
  verifyResetCode(code: number): boolean {
    if (this.resetCode === null || this.expirationTime === null) {
      return false;  // אם אין קוד או זמן תוקף שמורים
    }

    if (this.resetCode === code && this.expirationTime > Date.now()) {
      return true;  // אם הקוד נכון וזמן התוקף לא פג
    } else {
      return false;  // אם הקוד שגוי או הזמן פג
    }
  }

  // התחברות של משתמש
  getUserByEmailAndPass(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, { email, password });
  }

  // יצירת משתמש חדש
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/sign-up`, user);  // עדכון לנתיב '/sign-up'
  }

  // פונקציות נוספות לנהל את המשתמשים
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserByCode(code: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${code}`);
  }
}
