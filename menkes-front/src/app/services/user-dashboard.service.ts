import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { ApiService } from '../api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
  private apiUrl = `${environment.apiUrl}/user-dashboard`;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  getUserCourses(): Observable<Course[]> {
    return this.apiService.get(
      this.apiUrl + '/myCourses/' + this.userService.getUser()?.code
    );
  }

  getUserRequest(): Observable<Course[]> {
    return this.apiService.get(
      this.apiUrl + '/course-requests/' + this.userService.getUser()?.code
    );
  }

  getCourseProgress(courseCode: number): Observable<number> {
    return this.apiService.get<number>(
      `${this.apiUrl}/progress/${this.userService.getUser()?.code}/${courseCode}`
    );
  }
}
