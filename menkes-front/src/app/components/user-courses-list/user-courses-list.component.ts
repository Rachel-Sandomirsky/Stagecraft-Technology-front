import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { UserDashboardService } from 'src/app/services/user-dashboard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-courses-list',
  templateUrl: './user-courses-list.component.html',
  styleUrls: ['./user-courses-list.component.css'],
})
export class UserCoursesListComponent {
  userCourses: Course[] = [];

  constructor(
    private router: Router,
    private userDashboardService: UserDashboardService,
    private userService:UserService 
  ) {
    this.userDashboardService.getUserCourses().subscribe(
      (data) => {
        this.userCourses = data;
        this.loadCourseProgress(); // קריאת הפונקציה לטעינת התקדמות
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

  loadCourseProgress() {
    this.userCourses.forEach((course) => {
      this.userDashboardService
        .getCourseProgress(course.code)
        .subscribe((progress) => {
          course.progress = progress; // עדכון אחוזי התקדמות
          const element = document.querySelector(`.progress-bar[course-id="${course.code}"]`);
          if (element) {
            setTimeout(() => {
              (element as HTMLElement).style.width = `${progress}%`; // עדכון הרוחב לאחר עיכוב
            }, 100); // עיכוב קטן כדי לאפשר לאנימציה לעבוד
          }
        });
    });
  }
  

  viewCourse(courseId: number) {
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
