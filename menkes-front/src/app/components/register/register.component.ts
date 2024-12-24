import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from 'src/app/services/course.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
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
export class RegisterComponent implements OnInit, OnChanges {
  @Input() courseName: string = ''; 
  @Input() courseId: number = 0; 
  @Input() userData: any = {}; 

  registrationForm!: FormGroup;
  isOpen = false; 
  modalState = 'open'; 

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private courseService: CourseService,
    public modalService: ModalService,
    private userService: UserService, // Added userService
    private router: Router
  ) {
    this.modalService.modalState$.subscribe((state) => {
      this.isOpen = state;
      this.modalState = state ? 'open' : 'closed';
    });
  }

  ngOnInit(): void {
    console.log('Received userData:', this.userData);
    console.log('Received courseName:', this.courseName);

    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called with changes:', changes);
  
    if (this.registrationForm) {
      if (changes['userData'] && changes['userData'].currentValue) {
        console.log('Patching userData to form...');
        
        const email = changes['userData'].currentValue.email || '';
        if (email) {
          this.registrationForm.get('email')?.enable();
          this.registrationForm.patchValue({ email });
          this.registrationForm.get('email')?.disable(); 
        } else {
          console.error('Email is missing in userData:', changes['userData'].currentValue);
        }
  
        console.log('Updated form values with userData:', this.registrationForm.value);
      }
  
      if (changes['courseName'] && changes['courseName'].currentValue) {
        console.log('Patching courseName to form...');
        this.registrationForm.patchValue({
          course: changes['courseName'].currentValue,
        });
        console.log('Updated form values with courseName:', this.registrationForm.value);
      }
    }
  }
  
  initializeForm(): void {
    const user = this.userService.userSubject.getValue(); // Fetch current user data
    this.registrationForm = this.fb.group({
      fullName: [
        '', 
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Zא-ת\s]+$/), 
          Validators.minLength(2),
        ],
      ],
      email: [
        { value: user?.email || this.userData?.email || '', disabled: true },
        [Validators.required, Validators.email],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^0[2-9]\d{7,8}$/), 
        ],
      ],
      course: [{ value: this.courseName, disabled: true }],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = {
        ...this.registrationForm.getRawValue(),
        courseId: this.courseId,
      };

      console.log('Form Data to be sent:', formData);

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

  closeRegisterModal(): void {
    this.modalService.closeModal(); 
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