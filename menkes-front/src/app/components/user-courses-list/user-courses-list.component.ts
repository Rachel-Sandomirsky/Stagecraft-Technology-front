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
      },
      (err) => {
        if(err.status===401)
          this.router.navigate(['/reconnect'])
         else console.log("Error ")
      }
    );
  }

  viewCourse(courseId: number) {
    // ניווט לדף פרטי הקורס
    this.router.navigate(['/course-details', courseId]);
  }
}
