import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { UserDashboardService } from 'src/app/services/user-dashboard.service';

@Component({
  selector: 'app-user-courses-list',
  templateUrl: './user-courses-list.component.html',
  styleUrls: ['./user-courses-list.component.css'],
})
export class UserCoursesListComponent {
  userCourses: Course[] = [];

  constructor(
    private router: Router,
    private userDashboardService: UserDashboardService
  ) {
    this.userDashboardService.getUserCourses().subscribe(
      (data) => {
        this.userCourses = data;
        this.loadCourseProgress(); // קריאת הפונקציה לטעינת התקדמות
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadCourseProgress() {
    this.userCourses.forEach((course) => {
      this.userDashboardService
        .getCourseProgress(course.code)
        .subscribe((progress) => {
          course.progress = progress; // עדכון אחוזי התקדמות
          const element = document.querySelector(`.progress-bar[course-id="${course.code}"]`);
          if (element) {
            (element as HTMLElement).style.setProperty('--progress-width', `${progress}%`);
          }
        });
    });
  }
  

  viewCourse(courseId: number) {
    this.router.navigate(['/course-details', courseId]);
  }
}
