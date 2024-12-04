import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  @Input() course!: Course;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseCode = +this.route.snapshot.paramMap.get('code')!; // Get the course code from the route
    this.courseService.getCourseByCode(courseCode).subscribe({
      next: (data: Course) => {
        this.course = data;
      },
      error: (error) => {
        console.error('Failed to load course details:', error);
      }
    });
  }

  registerNow(): void {
   
  }
}
