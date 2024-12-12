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
  const  apiUrl :string = "https://menkes-2-back.onrender.com/courses";
    
    console.log('גרסה 7');
    console.log('API URL:', apiUrl); // וודאי שכתובת זו מודפסת

try{
    return this.apiService.get<Course[]>(apiUrl);
  } catch (error) {
    console.error('Error fetching courses:', error);
throw new Error
}

  }
  getCourseByCode(courseCode: number): Observable<Course> {
    const uu = "https://menkes-2-back.onrender.com/courses";

    return this.apiService.get<Course>(`${uu}/${courseCode}`);
  }
  
}
