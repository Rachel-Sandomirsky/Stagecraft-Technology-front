import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { Lesson } from '../models/lesson.model';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private apiUrl = `${environment.apiUrl}/lessons`;

  constructor(private apiService: ApiService) {}

  // Function to fetch all lessons by course ID
  getLessonsByCourseId(courseId: number): Observable<Lesson[]> {
    console.log('Fetching lessons for course ID:', courseId);
    return this.apiService.get<Lesson[]>(`${this.apiUrl}/${courseId}`).pipe(
      tap((lessons) => {
        console.log('Lessons fetched successfully:', lessons);
      }),
      catchError((error) => {
        console.error('Error fetching lessons:', error);
        const errorMessage =
          error?.error?.message || 'Failed to fetch lessons. Please try again.';
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        console.log('getLessonsByCourseId request completed.');
      })
    );
  }

  // Function to fetch a specific lesson by lesson ID
  getLessonById(lessonId: string): Observable<Lesson> {
    console.log('Fetching lesson by ID:', lessonId);
    return this.apiService.get<Lesson>(`${this.apiUrl}/${lessonId}`).pipe(
      tap((lesson) => {
        console.log('Lesson fetched successfully:', lesson);
      }),
      catchError((error) => {
        console.error('Error fetching lesson:', error);
        const errorMessage =
          error?.error?.message || 'Failed to fetch lesson. Please try again.';
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        console.log('getLessonById request completed.');
      })
    );
  }

  // Function to add a new lesson
  addLesson(lesson: Lesson): Observable<Lesson> {
    console.log('Preparing to add lesson:', lesson);

    return this.apiService.post<Lesson>(this.apiUrl, lesson).pipe(
      // לוג הצלחה מיידי לאחר שליחה לשרת
      tap((addedLesson) => {
        console.log('Lesson added successfully:', addedLesson); // מציג את השיעור שנוסף מהשרת
      }),

      // טיפול בשגיאות
      catchError((error) => {
        console.error('Error adding lesson:', error);

        // הודעת שגיאה מפורטת יותר
        const errorMessage =
          error?.error?.message ||
          (error.status === 400
            ? 'Invalid input. Please check the lesson details.'
            : error.status === 500
            ? 'Internal server error. Please try again later.'
            : 'Failed to add lesson. Please try again.');

        // הצגת לוג ברור עם פרטי השגיאה
        console.error('Detailed error message:', errorMessage);

        // החזרת השגיאה בצורה מותאמת
        return throwError(() => new Error(errorMessage));
      }),

      // מעקב אחר השלמת הפעולה
      finalize(() => {
        console.log('addLesson request completed.'); 
      })
    );
  }
}
