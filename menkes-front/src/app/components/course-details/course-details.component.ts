import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit, AfterViewInit {
  course!: Course;
  showNotRegisteredMessage = false;
  notAuthenticatedMessage = false; 
  modalData: any = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public modalService: ModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const courseCode = +this.route.snapshot.paramMap.get('code')!;
    this.courseService.getCourseByCode(courseCode).subscribe({
      next: (data: Course) => {
        this.course = data;
        console.log('Course loaded successfully:', this.course);
      },
      error: (error) => {
        console.error('Failed to load course details:', error);
      },
    });
  }

  ngAfterViewInit(): void {
    console.log('Course details loaded:', this.course);
  }

  openRegisterModal(): void {
    if (!this.course || !this.course.title) {
      console.error('Course details are not loaded yet');
      return;
    }
  
    const user = this.userService.userSubject.getValue(); 
    const isAuthenticated = !!user;
  
    if (isAuthenticated) {
      console.log('User is authenticated. Opening register modal.');
      this.modalData = {
        courseName: this.course.title,
        courseId: this.course['code'],
        userData: {
          email: user.email,
        },
      };
      console.log('Modal Data:', this.modalData); 
      
      this.modalService.openModal(this.modalData);
    } else {
      console.log('User is not authenticated. Showing message.');
      this.notAuthenticatedMessage = true;
      setTimeout(() => {
        this.notAuthenticatedMessage = false;
      }, 15000);
    }
  }
  
  
  closeRegisterModal(): void {
    console.log('Closing modal via ModalService');
    this.modalService.closeModal();
  }

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
