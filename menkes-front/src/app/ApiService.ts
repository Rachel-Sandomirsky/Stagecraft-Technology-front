import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient ) {
  }

  get<T>(url:string) {
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  getByParams<T>(url:string, params: { [key: string]: string | number }) {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<T>(url, { params: httpParams }).pipe(catchError(this.handleError));
  }

  post<T>(url:string, body: any) {
    return this.http.post<T>(url, body).pipe(catchError(this.handleError));
  }

  put<T>(url:string, body: any) {
    return this.http.put<T>(url, body).pipe(catchError(this.handleError));
  }

  delete<T>(url:string) {
    return this.http.delete<T>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred with the API.'));
  }
}
