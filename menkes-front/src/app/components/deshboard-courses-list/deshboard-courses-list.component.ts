import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Lesson } from 'src/app/models/lesson.model';
import { CourseService } from 'src/app/services/course.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-deshboard-courses-list',
  templateUrl: './deshboard-courses-list.component.html',
  styleUrls: ['./deshboard-courses-list.component.css']
})
export class DeshboardCoursesListComponent implements OnInit {
  courses: Course[] = []; // רשימת הקורסים
  lessons: Lesson[] = []; // רשימת השיעורים
  selectedCourseCode: number = 0; 
  @Output() addCourse = new EventEmitter<void>(); // אירוע להוספת קורס

  constructor(
    private courseService: CourseService,
    private lessonService: LessonsService,
    private router: Router,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    // טעינת הקורסים מהשירות
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log('Courses loaded:', this.courses); // לוג לקורסים שהתקבלו
      },
      (err) => {
        console.error('שגיאה בטעינת קורסים:', err);
      }
    );
  }

  onAddCourseClick(): void {
    this.addCourse.emit();
  }

  onCourseClick(course: Course): void {

    this.modalService.modalState$.subscribe((isOpen) => {
      if (this.selectedCourseCode === course.code) {
        console.log('Unselecting course:', course.code); // לוג הסרת בחירת קורס
        if (isOpen) {
          console.log('Modal is open. Preventing unselecting course.');
          return;
        }
        this.selectedCourseCode = 0; // נעדכן ל-0 במקום null
        this.lessons = [];
      } else {
        console.log('Selecting course:', course.code); // לוג בחירת קורס
        this.selectedCourseCode = course.code;
        this.loadLessons(course.code);
      }
    });
  }
  
  

  loadLessons(courseCode: number): void {
    this.lessonService.getLessonsByCourseId(courseCode).subscribe(
      (lessons) => {
        this.lessons = lessons;
        console.log('Lessons loaded successfully:', this.lessons); // לוג לשיעורים שהתקבלו
      },
      (error) => {
        console.error('שגיאה בטעינת שיעורים:', error);
      }
    );
  }

  onAddLessonClick(courseCode: number): void {
    console.log('Before opening modal - selectedCourseCode:', courseCode);
    if (!courseCode || courseCode === 0) {
      console.error('Invalid courseCode provided to AddLessonComponent:', courseCode);
      return;
    }
    this.selectedCourseCode = courseCode;
    console.log('Add Lesson clicked. selectedCourseCode set to:', this.selectedCourseCode);
    this.modalService.openModal();
  }
  
  
}
