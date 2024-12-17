import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // נוספה תלות ב-Router
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from 'src/app/services/course.service';
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
  courseName!: string;
  courseId!: number;
  isOpen = false;
  modalState = 'closed';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private courseService: CourseService,
    private modalService: ModalService,
    private router: Router // הוספנו Router
  ) {
    this.modalService.modalState$.subscribe((state) => {
      this.isOpen = state;
      this.modalState = state ? 'open' : 'closed';
    });
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
        ...this.registrationForm.getRawValue(), 
        courseId: this.courseId,
      };

      console.log('Form Data to be sent:', formData);

      // Send the data to the server
      this.http.post('http://localhost:3000/register', formData).subscribe(
        (response) => {
          console.log('Response from server:', response);
          alert('Form submitted successfully!');
        },
        (error) => {
          console.error('Error sending form:', error);
          alert('An error occurred while submitting the form.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  // פונקציה להעברת המשתמש לקומפוננטת course-details
  navigateToCourseDetails() {
    this.isOpen = false;
    this.router.navigate(['/course-details']);
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
