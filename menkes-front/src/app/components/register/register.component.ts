import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,ViewEncapsulation, ViewContainerRef 
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from 'src/app/services/course.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from 'src/app/services/register.service';

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
  encapsulation: ViewEncapsulation.None, // מחילה של סגנונות באופן גלובלי

})
export class RegisterComponent implements OnInit, OnChanges {
  @Input() courseName: string = '';
  courseId: number | null = Number(this.route.snapshot.paramMap.get('code'));
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
    private router: Router,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,  ) {
    this.modalService.modalState$.subscribe((state) => {
      this.isOpen = state;
      this.modalState = state ? 'open' : 'closed';
    });
  }

  ngOnInit(): void {
    this.initializeForm();

    const modalData = this.modalService.getModalData();

    if (modalData) {
      // עדכון הערכים של הטופס מיידית עם פתיחת המודל
      this.registrationForm.patchValue({
        email: modalData?.userData?.email || '',
        course: modalData?.courseName || '',
      });
    }
    console.log('Received userData:', this.userData);
    console.log('Received courseName:', this.courseName);

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
          console.error(
            'Email is missing in userData:',
            changes['userData'].currentValue
          );
        }

        console.log(
          'Updated form values with userData:',
          this.registrationForm.value
        );
      }

      if (changes['courseName'] && changes['courseName'].currentValue) {
        console.log('Patching courseName to form...');
        this.registrationForm.patchValue({
          course: changes['courseName'].currentValue,
        });
        console.log(
          'Updated form values with courseName:',
          this.registrationForm.value
        );
      }
    }
  }

  initializeForm(): void {
    const user = this.userService.userSubject.getValue();
    
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required,Validators.pattern(/^[a-zA-Zא-ת\s]+$/),
         Validators.minLength(2)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^0[2-9]\d{7,8}$/)]],
      course: [{ value: '', disabled: true }],
    });
  }
  showSnackBar(): void {
    this.snackBar.open('זה עובד!', 'סגור', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async onSubmit(): Promise<void> {
    debugger
    if (this.registrationForm.valid) {
      const formData = {
        user_email: this.email?.value,
        course_code: this.courseId,
      };

      const observable = await this.registerService.registerForCourse(formData);
      observable.subscribe(
        (response) => {
          console.log('Response from server:', response);
          setTimeout(() => {
            this.closeRegisterModal();
          });
          // הצגת ההודעה היפה
          this.snackBar.open('הרישום בוצע בהצלחה!', 'סגור', {
            duration: 5000, // משך הזמן שבו ההודעה מוצגת (במילישניות)
            horizontalPosition: 'center',
            verticalPosition: 'top'

          });
                },
        (error) => {
          if (error.error?.errorCode) {
            switch (error.error.errorCode) {
              case 'USER_ALREADY_REGISTERED':
                {     
                this.snackBar.open('אתה כבר רשום לקרוס זה...', 'סגור', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
                break;
              case 'AWAITING_APPROVAL':
                this.snackBar.open('אתה בהמתנה לאישור... נודיע לך מייד עם אישורך', 'סגור', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top'
                });

                break;
              case 'COURSE_NOT_FOUND':
                this.snackBar.open('קורס לא קיים', 'סגור', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top'
                });

                break;
              case 'USER_NOT_FOUND':
                this.snackBar.open('משתמש לא רשום.', 'סגור', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top'
                });
                break;
              default:
                this.snackBar.open('אירעה שגיאה במהלך הרישום. נסה שוב.', 'סגור', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top'
                });
            }
          }
          else {
            this.snackBar.open('אירעה שגיאה במהלך הרישום. נסה שוב.', 'סגור', {
              duration: 111115000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        }
      );
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
