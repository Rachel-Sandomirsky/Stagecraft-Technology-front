import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = `https://menkes-2-back.onrender.com/courses`;
  constructor(private apiService: ApiService) {}

// Function to fetch real courses
  getCourses(): Observable<Course[]> {
    console.log('גרסה 1);
try{
    return this.apiService.get<Course[]>(this.apiUrl);
  } catch (error) {
    console.error('Error fetching courses:', error);
throw new Error
}

  }
  getCourseByCode(courseCode: number): Observable<Course> {
    return this.apiService.get<Course>(`${this.apiUrl}/${courseCode}`);
  }
  
}
