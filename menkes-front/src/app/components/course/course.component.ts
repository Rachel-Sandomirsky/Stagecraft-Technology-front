import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  @Input() course!: Course;

  constructor(private router: Router, private modelService:ModalService) {}

  // register(course: Course): void {
  //   this.router.navigate(['/register', course.title]); // Navigate using the course title
  //   console.log('Navigating to /register/' + course.title);
  // }

  registerForCourse() {
    this.modelService.openModal(); // פותח את החלונית
  }
}
