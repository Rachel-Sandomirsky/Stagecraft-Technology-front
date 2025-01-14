import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://menkes-2-back-1.onrender.com'; 

  constructor(private http: HttpClient) {}

  // פונקציה לקבלת נתונים מ-API
  get<T>(url: string) {
    const headers = new HttpHeaders().set('x-api-key', 'your-api-key-here'); 
    return this.http.get<T>(url, { headers }).pipe(catchError(this.handleError));
  }

  // פונקציה לקבלת נתונים מ-API עם פרמטרים
  getByParams<T>(url: string, params: { [key: string]: string | number }) {
    const httpParams = new HttpParams({ fromObject: params });
    const headers = new HttpHeaders().set('x-api-key', 'your-api-key-here'); 
    return this.http.get<T>(url, { params: httpParams, headers }).pipe(catchError(this.handleError));
  }

  // פונקציה לשלוח נתונים ל-API
  post<T>(url: string, body: any) {
    const headers = new HttpHeaders().set('x-api-key', 'your-api-key-here'); 
    return this.http.post<T>(url, body, { headers }).pipe(catchError(this.handleError));
  }

  // פונקציה לעדכן נתונים ב-API
  put<T>(url: string, body: any) {
    const headers = new HttpHeaders().set('x-api-key', 'your-api-key-here'); 
    return this.http.put<T>(url, body, { headers }).pipe(catchError(this.handleError));
  }

  // פונקציה למחוק נתונים ב-API
  delete<T>(url: string) {
    const headers = new HttpHeaders().set('x-api-key', 'your-api-key-here'); 
    return this.http.delete<T>(url, { headers }).pipe(catchError(this.handleError));
  }

  // פונקציה לטיפול בשגיאות של הבקשות ל-API
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);

    return throwError(() => error.error ? error: new Error('An error occurred with the API.'));
  }
   // הוספת פונקציית PATCH
   patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(url, body).pipe(catchError(this.handleError));
  }

}
