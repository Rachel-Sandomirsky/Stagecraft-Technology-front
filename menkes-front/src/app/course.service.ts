import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from './models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses'; 

  constructor(private http: HttpClient) {}

  // פונקציה לקבלת קורסים אמיתיים
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // פונקציה לקבלת נתונים מדומים (לשימוש זמני)
  getMockCourses(): Observable<Course[]> {
    const mockCourses: Course[] = [
      new Course(
        'עקרונות בסיסיים של תכנון מעגלים חשמליים',
        2,
        'למד את יסודות התכנון והניתוח של מעגלים חשמליים.',
        'assets/img/1.jpg',
        59.90,
        4.8,
        12345
      ),
      new Course(
        'טכניקות מתקדמות באינסטלציה',
        3,
        'שפר את המיומנויות שלך באינסטלציה מתקדמת למערכות ביתיות ומסחריות.',
        'assets/img/2.png',
        79.90,
        4.7,
        23456
      ),
      new Course(
        'איתור תקלות במערכות מיזוג אוויר',
        4,
        'למד כיצד לאתר ולתקן בעיות נפוצות במערכות HVAC.',
        'assets/img/3.jpg',
        69.90,
        4.6,
        34567
      ),
      new Course(
        'קריאת תכניות עבודה לטכנאים',
        5,
        'הבנת תכניות טכניות ותכניות בנייה בקלות.',
        'assets/img/10.jpg',
        49.90,
        4.5,
        45678
      ),
      new Course(
        'יסודות ריתוך ובטיחות',
        6,
        'התחל ללמוד טכניקות ריתוך ושמירה על אמצעי בטיחות.',
        'assets/img/5.png',
        89.90,
        4.4,
        56789
      ),
      new Course(
        'מערכות אנרגיה מתחדשת',
        7,
        'חקור מערכות סולאריות, רוח ועוד מערכות אנרגיה מתחדשת.',
        'assets/img/6.png',
        99.90,
        4.9,
        67890
      ),
      new Course(
        'הדפסת תלת-ממד לטכנאים',
        8,
        'למד את היסודות של הדפסת תלת-ממד וכיצד ליישם אותה בפרויקטים טכניים.',
        'assets/img/7.jpg',
        69.90,
        4.6,
        78901
      ),
      new Course(
        'מדריך לטכנאים להתקני בית חכם',
        9,
        'התקן ותחזק מערכות בית חכם עם הקורס המקיף הזה.',
        'assets/img/8.jpg',
        89.90,
        4.8,
        89012
      ),
     
] ;    
    return of(mockCourses);
  }
}  