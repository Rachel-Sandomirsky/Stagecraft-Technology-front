import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from 'src/app/course.service';
import { ModalService } from 'src/app/services/modal.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fade', [
      state('open', style({ opacity: 1, transform: 'translateY(0)' })),
      state('closed', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition('open => closed', [animate('0.3s ease-in')]),
      transition('closed => open', [animate('0.3s ease-out')]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  courseName!: string; // Course name for display purposes only
  courseId!: number; // Course ID to be sent to the server
  isOpen = false;
  modalState='closed';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private courseService: CourseService, // Service for courses
    private modalService: ModalService
  ) {
    this.modalService.modalState$.subscribe((state) => {
      this.isOpen = state;
      this.modalState=state ? 'open' :'closed';
    });
  }
  closeModal() {
    this.modalState = 'closed'; // מצב אנימציה ל"סגירה"
    setTimeout(() => {
      this.modalService.closeModal(); // חזרה למיקום לאחר סיום האנימציה
    }, 300); // תיאום לזמן האנימציה
  }


  ngOnInit(): void {
    // Extract course name from the route
    this.courseName = this.route.snapshot.paramMap.get('course') || 'Unknown Course';

    // Initialize the registration form
    this.registrationForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Zא-ת\s]+$/), // Only letters and spaces
          Validators.minLength(2),
        ],
      ],
      email: ['', [Validators.required, Validators.email]], // Valid email
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^0[2-9]\d{7,8}$/), // Israeli phone number format
        ],
      ],
      course: [{ value: this.courseName, disabled: true }], // Disabled field for display
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = {
        ...this.registrationForm.getRawValue(), // Form data
        courseId: this.courseId, // Add course ID to the submitted data
      };

      console.log('Form Data to be sent:', formData); // Log data to the console

      // Send the data to the server
      this.http.post('http://localhost:3000/register', formData).subscribe(
        (response) => {
          console.log('Response from server:', response); // Server response
          alert('Form submitted successfully!');
        },
        (error) => {
          console.error('Error sending form:', error); // Error while submitting
          alert('An error occurred while submitting the form.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
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
