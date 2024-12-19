// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { User } from '../models/user';
// import { ApiService } from '../api.service';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private resetCode: number | null = null;
//   private expirationTime: number | null = null;
//   public userSubject = new BehaviorSubject<User | null>(null);
//   user$ = this.userSubject.asObservable();

//   private apiUrl = environment.apiUrl;  // apiUrl כללית

//   constructor(private apiService: ApiService) {}

//   // פונקציה לשליחת קוד איפוס למייל
//   sendPasswordResetCode(email: string): Observable<any> {
//     return this.apiService.post(`${this.apiUrl}/users/password_reset_code`, { email }).pipe(
//       tap((response: any) => {
//         this.resetCode = response.resetCode;  
//         this.expirationTime = Date.now() + 5 * 60 * 1000; 
//       })
//     );
//   }

//   // פונקציה לאימות קוד האימות
//   verifyResetCode(code: number): boolean {
//     if (this.resetCode === null || this.expirationTime === null) {
//       return false;  
//     }

//     if (this.resetCode === code && this.expirationTime > Date.now()) {
//       return true;  
//     } else {
//       return false;  
//     }
//   }


//   verifyUser(mail:string,code:string){
//     return this.apiService.post<string>(`${this.apiUrl}/sign-up/'verify_code`, { mail, code })
//   }
//   // התחברות של משתמש
//   getUserByEmailAndPass(email: string, password: string): Observable<User> {
//    return this.apiService.post<User>(`${this.apiUrl}/auth`, { email, password }).pipe(
//     tap((user) => {
//       console.log("user: " + user.username);
//       console.log("role: " + user.role);
//       this.userSubject.next(user);
//     })
//   );    
// }
// public logout():void{
//   const user = this.userSubject.getValue(); // שליפת הערך הנוכחי של המשתמש
//   console.log(user);
//   if (user && user.email && user.access_token) {
//     this.apiService.post<any>(`${this.apiUrl}/logout`, { 
//       email: user.email, 
//       token: user.access_token 
//     }).subscribe({
//       next: (response) => {
//         console.log('Logout successful:', response.message);
//         this.userSubject.next(null); 
//       },
//       error: (err) => {
//         console.error('Error during logout:', err.error?.message || err.message);
//       }
//     });
//   } else {
//     console.error('User or token not found.');
//   }

// }

//   // יצירת משתמש חדש
//   createUser(user: User): Observable<User> {
//     return this.apiService.post<User>(`${this.apiUrl}/sign-up`, user);  // עדכון לנתיב '/sign-up'
//   }

//   getUserByCode(code: string): Observable<User> {
//     return this.apiService.get<User>(`${this.apiUrl}/users/${code}`);
//   }


// getRole(): string {
//   const user = this.userSubject.getValue(); 
//   if(user)
//   {
//     return user.role;
//   }
//   return ''; // החזרת ה-Role הנוכחי
// }
// }

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

  constructor(private apiService: ApiService) {}

 
  // שליחת קוד אימות למייל
  sendVerificationCode(signUpData: { username: string; email: string; password: string }): Observable<any> {
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
        this.userSubject.next(user);
      })
    );
  }

  // פרטי המשתמש הנוכחי
  getUser(): User | null {
    return this.userSubject.getValue();
  }

  // יציאה מהחשבון
  logout(): void {
    const user = this.getUser();
    if (user) {
      this.apiService.post(`${this.apiUrl}/logout`, { email: user.email }).subscribe({
        next: (response) => {
          this.userSubject.next(null);
        },
        error: (err) => {
          console.error('Error during logout:', err);
        },
      });
    }
  }
}
