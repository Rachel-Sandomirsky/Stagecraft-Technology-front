import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  @Input() course!: Course;

  constructor(private router: Router) {}

  register(course: Course): void {
    this.router.navigate(['/register', course.title]); // Navigate using the course title
    console.log('Navigating to /register/' + course.title);
  }
}
