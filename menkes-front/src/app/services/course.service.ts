import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`
  constructor(private apiService: ApiService) {}

// Function to fetch real courses
  getCourses(): Observable<Course[]> {
    console.log('גרסה 9');
    console.log('API URL:', this.apiUrl); // וודאי שכתובת זו מודפסת
    return this.apiService.get<Course[]>(this.apiUrl);
}

  getCourseByCode(courseCode: number): Observable<Course> {
    console.log('Requesting course by code:', courseCode);
    return this.apiService.get<Course>(`${this.apiUrl}/${courseCode}`);
  }


  addCourse(course:Course)
  {
    return this.apiService.post(this.apiUrl,course)
  }


  
}
