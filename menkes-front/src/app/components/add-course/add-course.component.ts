import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequiresToken } from 'src/app/interceptors/TokenDecorator';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {
  courseForm: FormGroup;
  topics: string[] = []; // מערך נושאים שיתעדכן בזמן אמת

  constructor(private fb: FormBuilder, private courseService: CourseService,private router: Router) {
    // יצירת Reactive Form עם השדות הנדרשים
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      topicsInput: [''], // שדה זמני לעדכון הנושאים
    });
  }

  // עדכון רשימת הנושאים מתוך שדה הקלט
  
  updateTopics() {
    
    const topicsInput = this.courseForm.get('topicsInput')?.value;
    if (topicsInput) {
      this.topics = topicsInput.split(',').map((topic: string) => topic.trim());
    }
   
  }

  // שליחת הטופס לשרת
  @RequiresToken()
  onSubmit() {
    if (this.courseForm.valid) {
      // יצירת אובייקט מסוג Course
      const course = new Course(
        this.courseForm.value.title,
        0, // קוד (ברירת מחדל)
        this.courseForm.value.description,
        this.courseForm.value.image,
        +this.courseForm.value.price, 
        0, 
        0, 
        this.topics 
      );
      // שליחת האובייקט לשרת
      this.courseService.addCourse(course).subscribe(
        (response) => {
          alert('Course added successfully');
        },
        (e: any) => {
         
          if(e.status===401)
              this.router.navigate(['/reconnect'])
          else console.log('Error adding course:' + e)}
        
      );
    } else {
      alert('Form is invalid');
    }
  }
}
