import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/course.service';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = []; // מאגר הקורסים ריק בהתחלה

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    // ניסיון לטעון קורסים מה-API
    this.courseService.getCourses().subscribe({
      next: (data: Course[]) => { // טיפוס מוגדר
        this.courses = data;
      },
      error: () => {
        console.warn('Failed to load courses from API. Loading mock data...');
        this.courseService.getMockCourses().subscribe((mockData: Course[]) => { // טיפוס מוגדר
          this.courses = mockData;
        });
      }
    });
  }
}
