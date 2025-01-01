import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';  // יבוא של שירות המשתמש
import 'reflect-metadata';  // לוודא שהספריה פעילה

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // שליפת הטוקן מה-UserService (אם קיים)
    const token = this.getTokenFromStore();

    if (token) {
      // קלון של הבקשה והוספת הטוקן להדר
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,  // הוספת הטוקן להדר
        },
      });

      // שליחת הבקשה עם הטוקן
      return next.handle(clonedRequest);
    }

    // אם לא נמצא טוקן, שליחה רגילה של הבקשה
    return next.handle(req);
  }

  // פונקציה לשליפת הטוקן מה-store (localStorage או UserService)
  private getTokenFromStore(): string | null {
    // אפשרות 1: לשלוף את הטוקן מ-UserService (נניח שמידע הטוקן נמצא בתוך האובייקט שנשמר ב-user$)
    const user = this.userService.getUser(); // שליפת המשתמש הנוכחי
    if (user && user.access_token) {
      return user.access_token; // אם יש טוקן, מחזירים אותו
    }
    
    // אפשרות 2: לשלוף את הטוקן מ-localStorage אם לא נמצא ב-UserService
    return localStorage.getItem('authToken');  // שליפת הטוקן מ-localStorage
  }
}