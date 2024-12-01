import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  courseName!: string; // שם הקורס לתצוגה בלבד
  courseId!: number; // מזהה הקורס לשליחה לשרת

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private courseService: CourseService // חיבור לשירות הקורסים
  ) {}

  ngOnInit(): void {
    // שליפת שם הקורס מהנתיב
    this.courseName = this.route.snapshot.paramMap.get('course') || 'Unknown Course';

    // שליפת מזהה הקורס על בסיס השם
    this.courseService.getMockCourses().subscribe((courses) => {
      const course = courses.find((c) => c.title === this.courseName);
      if (course) {
        this.courseId = course.code;
        console.log('Course ID loaded:', this.courseId);
      } else {
        console.error('Course not found!');
      }
    });

    // יצירת טופס הרשמה
    this.registrationForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Zא-ת\s]+$/), // רק אותיות ורווחים
          Validators.minLength(2),
        ],
      ],
      email: ['', [Validators.required, Validators.email]], // אימות מייל תקין
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^0[2-9]\d{7,8}$/), // תבנית מספר טלפון ישראלי
        ],
      ],
      course: [{ value: this.courseName, disabled: true }], // שדה מנוטרל לתצוגה
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = {
        ...this.registrationForm.getRawValue(), // הנתונים מהטופס
        courseId: this.courseId, // הוספת מזהה הקורס לנתונים הנשלחים
      };

      console.log('Form Data to be sent:', formData); // הצגת נתונים בקונסול

      // שליחת הנתונים לשרת
      this.http.post('http://localhost:3000/register', formData).subscribe(
        (response) => {
          console.log('Response from server:', response); // תגובת השרת
          alert('הטופס נשלח בהצלחה!');
        },
        (error) => {
          console.error('Error sending form:', error); // שגיאה במשלוח
          alert('אירעה שגיאה בעת שליחת הטופס.');
        }
      );
    } else {
      alert('אנא מלא את הטופס בצורה תקינה.');
    }
  }

  get fullName() {
    return this.registrationForm.get('fullName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }
}
