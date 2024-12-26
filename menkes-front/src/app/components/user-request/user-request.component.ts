import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { UserDashboardService } from 'src/app/services/user-dashboard.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['../user-courses-list/user-courses-list.component.css']
})
export class UserRequestComponent {
userRequestList: Course[] = [];
  constructor(
    private router: Router,
    private userDashboardService: UserDashboardService
  ) {
    this.userDashboardService.getUserRequest().subscribe(
      (data) => {
        this.userRequestList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewRequest(courseId: number) {
    // ניווט לדף פרטי הקורס
    this.router.navigate(['/course-details', courseId]);
  }
}
