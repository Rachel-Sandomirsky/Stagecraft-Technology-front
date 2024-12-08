import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;
  constructor(private apiService: ApiService) {}

// Function to fetch real courses
  getCourses(): Observable<Course[]> {
    return this.apiService.get<Course[]>(this.apiUrl);
  }
  getCourseByCode(courseCode: number): Observable<Course> {
    return this.apiService.get<Course>(`${this.apiUrl}/${courseCode}`);
  }
  
}
