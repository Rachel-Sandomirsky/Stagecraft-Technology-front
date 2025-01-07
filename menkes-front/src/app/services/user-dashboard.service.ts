import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';
import { ApiService } from '../api.service';
import { UserService } from './user.service';
import { RequiresToken } from '../interceptors/TokenDecorator';
import { UserQuizz } from '../models/userQuizz';

@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
 
  private apiUrl = `${environment.apiUrl}/user-dashboard`;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}
  @RequiresToken()
  getUserCourses(): Observable<Course[]> {
    return this.apiService.get(
      this.apiUrl + '/myCourses'
    );
  }
  @RequiresToken()
  getUserRequest(): Observable<Course[]> {
    return this.apiService.get(
      this.apiUrl + '/course-requests'
    );
  }
  @RequiresToken()
  getUserAchievements(): Observable<UserQuizz[]> {
    return this.apiService.get(
      this.apiUrl + '/user-quizzes'
    );  }

  getCourseProgress(courseCode: number): Observable<number> {
    return this.apiService.get<number>(
      `${this.apiUrl}/progress/${this.userService.getUser()?.code}/${courseCode}`
    );
  }
}
