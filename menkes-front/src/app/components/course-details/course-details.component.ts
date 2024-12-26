import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('lessonSection') lessonSection!: ElementRef;
  course!: Course;
  showNotRegisteredMessage = false;
  notAuthenticatedMessage = false;
  modalData: any = null;
  isUserRegistered: boolean = true;
  lessons: any[] = [];
  selectedLesson: any = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public modalService: ModalService,
    private userService: UserService,
    private lessonsService: LessonsService
  ) {}

  ngOnInit(): void {
    const courseCode = +this.route.snapshot.paramMap.get('code')!;
    this.courseService.getCourseByCode(courseCode).subscribe({
      next: (data: Course) => {
        this.course = data;
        console.log('Course loaded successfully:', this.course);

        // בדוק אם המשתמש רשום והעלה שיעורים אם כן
        if (this.isUserRegistered) {
          this.loadLessonsAndSetDefault();
        }
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
        courseId: this.course.,
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
    if (this.isUserRegistered) {
      this.loadLessonsAndScroll();
    } else {
      // הצגת הודעה בקומפוננטה אם המשתמש לא רשום
      this.showNotRegisteredMessage = true;

      setTimeout(() => {
        this.showNotRegisteredMessage = false;
      }, 3000); // ההודעה נעלמת לאחר 3 שניות
    }
  }

  private loadLessons(): void {
    this.lessonsService.getLessonsByCourseId(this.course.code).subscribe(
      (data) => {
        console.log('Received lessons:', data);
        this.lessons = data; // שמירת השיעורים שהתקבלו
        this.selectedLesson = this.lessons[0]; // בחירת השיעור הראשון כברירת מחדל
      },
      (error) => {
        console.error('Error fetching lessons:', error);
        alert('שגיאה בטעינת השיעורים. נסה שוב מאוחר יותר.');
      }
    );
  }

  private loadLessonsAndScroll(): void {
    this.lessonsService.getLessonsByCourseId(this.course.code).subscribe(
      (data) => {
        console.log('Received lessons:', data);
        this.lessons = data; // שמירת השיעורים שהתקבלו
        this.selectedLesson = this.lessons[0]; // בחירת השיעור הראשון כברירת מחדל

        // גלילה לקומפוננטת השיעורים
        setTimeout(() => {
          if (this.lessonSection && this.lessonSection.nativeElement) {
            this.lessonSection.nativeElement.scrollIntoView({
              behavior: 'smooth',
            });
          } else {
            console.error('lessonSection is not defined or not loaded.');
          }
        }, 100); // עיכוב קצר
      },
      (error) => {
        console.error('Error fetching lessons:', error);
        alert('שגיאה בטעינת השיעורים. נסה שוב מאוחר יותר.');
      }
    );
  }

  private loadLessonsAndSetDefault(): void {
    this.lessonsService.getLessonsByCourseId(this.course.code).subscribe(
      (data) => {
        console.log('Received lessons:', data);
        this.lessons = data; // שמירת השיעורים שהתקבלו
        this.selectedLesson = this.lessons[0]; // בחירת השיעור הראשון כברירת מחדל

        // מציג את השיעור הראשון כברירת מחדל
        if (this.selectedLesson) {
          console.log('Default lesson set:', this.selectedLesson);
        }
      },
      (error) => {
        console.error('Error fetching lessons:', error);
        alert('שגיאה בטעינת השיעורים. נסה שוב מאוחר יותר.');
      }
    );
  }
}
