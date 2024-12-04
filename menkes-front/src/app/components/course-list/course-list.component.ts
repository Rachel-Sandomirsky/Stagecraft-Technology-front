import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = []; // The initial list of courses is empty

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    // Attempt to fetch courses from the API
    this.courseService.getCourses().subscribe({
      next: (data: Course[]) => { // Defined data type
        this.courses = data;
      },
      error: (error) => {
        console.error('Failed to load courses from API:', error);
        // If an error occurs, a message can be shown to the user
      }
    });
  }
  viewDetails(courseCode: number): void {
    this.router.navigate(['/courses', courseCode]);
  }
  
}
