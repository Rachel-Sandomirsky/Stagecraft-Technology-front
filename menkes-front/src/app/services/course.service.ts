import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private apiService: ApiService) {}

// Function to fetch real courses
  getCourses(): Observable<Course[]> {
    (window as any).kkk = "https://menkes-2-back.onrender.com/courses";
    
    console.log('גרסה 6');
    console.log('API URL:', (window as any).kkk); // וודאי שכתובת זו מודפסת

try{
    return this.apiService.get<Course[]>((window as any).kkk);
  } catch (error) {
    console.error('Error fetching courses:', error);
throw new Error
}

  }
  getCourseByCode(courseCode: number): Observable<Course> {
    const apiUrl = "https://menkes-2-back.onrender.com/courses";

    return this.apiService.get<Course>(`${apiUrl}/${courseCode}`);
  }
  
}
