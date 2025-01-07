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
  selectedLesson: Lesson | null = null; // השיעור שנבחר למחיקה
  selectedCourse: Course | null = null; // הקורס שבו נמצא השיעור
  showDeleteModal: boolean = false; // מצב החלונית למחיקה
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

  // פונקציה להצגת חלונית המחיקה
  onDeleteClick(lesson: Lesson, course: Course): void {
    this.selectedLesson = lesson;
    this.selectedCourse = course;
    this.showDeleteModal = true;
  }

  // פונקציה לסגירת חלונית המחיקה
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.selectedLesson = null;
    this.selectedCourse = null;
  }

  // פונקציה למחיקת שיעור לאחר אישור
  confirmDelete(): void {
    if (this.selectedLesson && this.selectedLesson.lessone_code !== undefined) {
      this.lessonService.deleteLesson(this.selectedLesson.lessone_code).subscribe({
        next: () => {
          console.log('Lesson deleted successfully.');
          this.showDeleteModal = false; // סגור את המודל
          this.selectedLesson = null;
          this.selectedCourse = null;
          this.loadLessons(this.selectedCourseCode); // עדכון השיעורים בקורס
        },
        error: (err) => {
          console.error('Error deleting lesson:', err);
        }
      });
    } else {
      console.error('Error: lessone_code is undefined. Cannot delete lesson.');
    }
  }
  
}
