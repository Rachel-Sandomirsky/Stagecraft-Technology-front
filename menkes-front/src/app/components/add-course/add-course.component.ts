import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {
  selectedFile: File | null = null;
  courseForm: FormGroup;
  topics: string[] = []; // מערך נושאים שיתעדכן בזמן אמת

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    // יצירת Reactive Form עם השדות הנדרשים
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
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
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(form: any): void {
    if (form.invalid || !this.selectedFile) {
      alert('נא למלא את כל השדות ולבחור תמונה.');
      return;
    }

    const formData = new FormData();
    const topicsArray: string[] = this.courseForm.value.topicsInput
    .split(',')
    .map((topic: string) => topic.trim());    // המרת הנושאים למערך

    formData.append('title', form.value.title);
    formData.append('description', form.value.description);
    formData.append('price', form.value.price);
    topicsArray.forEach((topic) => {
      formData.append('topics', topic);
    });
    formData.append('image', this.selectedFile); // הוספת התמונה

    this.courseService.addCourse(formData).subscribe({
      next: (response) => {
        console.log('Course added successfully', response);
      },
      error: (err) => {
        console.error('Error adding course:', err);
      },
    });
  }
}
