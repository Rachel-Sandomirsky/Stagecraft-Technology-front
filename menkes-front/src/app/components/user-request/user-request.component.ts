import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { UserDashboardService } from 'src/app/services/user-dashboard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['../user-courses-list/user-courses-list.component.css']
})
export class UserRequestComponent {
userRequestList: Course[] = [];
  constructor(
    private router: Router,
    private userDashboardService: UserDashboardService,
    private userService:UserService 
  ) {
    this.userDashboardService.getUserRequest().subscribe(
      (data) => {
        this.userRequestList = data;
      },
      (err) => {
        if(err.status===401)
          {
            const currentUrl = this.router.url;
            this.router.navigate(['/reconnect'])
            setTimeout(() => {
             
              this.router.navigate([currentUrl]);
            }, 5000); 
            this.onLogout() ;
          }
         else console.log("Error ")
      }
    );
  }

  viewRequest(courseId: number) {
    // ניווט לדף פרטי הקורס
    this.router.navigate(['/course-details', courseId]);
  }
  onLogout() {
    this.userService.logout()
      .subscribe({
        next: (response) => {
          console.log('Logout successfull:', response.message);
          this.userService.userSubject.next(null);
        },
        error: (err) => {
          console.error(
            'Error during logout:',
            err.error?.message || err.message
          );
        },
      });}
}
