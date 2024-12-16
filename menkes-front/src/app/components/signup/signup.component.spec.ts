import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';  // הייבוא של ReactiveFormsModule
import { RouterTestingModule } from '@angular/router/testing';  // עבור בדיקות נווטות

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        ReactiveFormsModule,  // הוספת ReactiveFormsModule
        RouterTestingModule   // חשוב אם יש ניווטים בקומפוננטה
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSignup when the form is valid', () => {
    spyOn(component, 'onSignup');  // התמקדות בבדיקת קריאת הפונקציה

    component.signupForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    fixture.debugElement.nativeElement.querySelector('button').click();  // חיקוי של הקלקה על כפתור ההרשמה

    expect(component.onSignup).toHaveBeenCalled();  // ווידוא שהפונקציה קראה
  });
});
