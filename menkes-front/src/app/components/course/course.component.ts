import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  @Input() course!: Course;

  constructor(private router: Router) {
  }

  // registerForCourse(): void {
  //   try {
  //     console.log('Registering for course:', this.course.title);
  //     this.modalService.openModal(); 
  //   } catch (error) {
  //     console.error('Error during course registration:', error);
  //   }
  // }
}
