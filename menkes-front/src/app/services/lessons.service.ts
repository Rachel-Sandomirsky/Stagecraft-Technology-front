import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson, TranscriptItem } from '../models/lesson.model';
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
    return this.apiService.get<Lesson[]>(`${this.apiUrl}/${courseId}`);
  }

  // Function to fetch a specific lesson by lesson ID
  getLessonById(lessonId: string): Observable<Lesson> {
    console.log('Fetching lesson by ID:', lessonId);
    return this.apiService.get<Lesson>(`${this.apiUrl}/${lessonId}`);
  }

  // Function to add a new lesson
  addLesson(lesson: Lesson): Observable<Lesson> {
    console.log('Adding a new lesson:', lesson);
    return this.apiService.post<Lesson>(this.apiUrl, lesson);
  }
}
