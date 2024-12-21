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

  ngAfterViewInit(): void {
    console.log('Course details loaded:', this.course);
    }

    openRegisterModal(): void {
      if (!this.course || !this.course.title) {
        console.error('Course details are not loaded yet');
        return;
      }
      console.log('Opening modal via ModalService');
      this.modalService.openModal();
    }
    
  closeRegisterModal(): void {
    console.log('Closing modal via ModalService');
    this.modalService.closeModal(); // סוגר את המודל דרך השירות
  }

  viewCourse(): void {
    if (this.course.isRegistered) {
      window.open('dummy-link-to-course-view', '_blank');
    } else {
      this.showNotRegisteredMessage = true;
      setTimeout(() => {
        this.showNotRegisteredMessage = false;
      }, 7000); // ההודעה תיעלם אחרי 7 שניות
    }
  }
  

}
