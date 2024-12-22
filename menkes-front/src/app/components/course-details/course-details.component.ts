import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit, AfterViewInit {
  course!: Course;
  showNotRegisteredMessage = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public modalService: ModalService
  ) {}

  // ngOnInit: Called when the component is initialized. Fetches the course details based on the code in the route.
  ngOnInit(): void {
    const courseCode = +this.route.snapshot.paramMap.get('code')!;
    this.courseService.getCourseByCode(courseCode).subscribe({
      next: (data: Course) => {
        this.course = data;
        console.log('Course loaded successfully:', this.course);
      },
      error: (error) => {
        console.error('Failed to load course details:', error);
      }
    });
  }

  // ngAfterViewInit: Called after the component's view has been initialized. Logs the course details to the console.
  ngAfterViewInit(): void {
    console.log('Course details loaded:', this.course);
  }

  // openRegisterModal: Opens the registration modal if course details are valid. Calls the modal service.
  openRegisterModal(): void {
    if (!this.course || !this.course.title) {
      console.error('Course details are not loaded yet');
      return;
    }
    console.log('Opening modal via ModalService');
    this.modalService.openModal();
  }

  // closeRegisterModal: Closes the registration modal. Calls the modal service.
  closeRegisterModal(): void {
    console.log('Closing modal via ModalService');
    this.modalService.closeModal(); 
  }

  // viewCourse: Opens a link to view the course if the user is registered. Displays a message if not registered.
  viewCourse(): void {
    if (this.course.isRegistered) {
      window.open('dummy-link-to-course-view', '_blank');
    } else {
      this.showNotRegisteredMessage = true;
      setTimeout(() => {
        this.showNotRegisteredMessage = false;
      }, 7000); 
    }
  }
}
