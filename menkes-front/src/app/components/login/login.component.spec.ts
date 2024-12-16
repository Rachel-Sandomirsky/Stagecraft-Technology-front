import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';  // הייבוא של ReactiveFormsModule
import { RouterTestingModule } from '@angular/router/testing';  // חשוב עבור בדיקות ניווט

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,   // חשוב לוודא שהמודול הזה מיובא
        RouterTestingModule,   // מאפשר ביצוע בדיקות ניווט
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onForgotPassword when the link is clicked', () => {
    spyOn(component, 'onForgotPassword');  // התמקדות בבדיקת קריאת הפונקציה

    const link = fixture.debugElement.nativeElement.querySelector('a');
    link.click();  // חיקוי של קליק על הקישור לשכחת סיסמה

    expect(component.onForgotPassword).toHaveBeenCalled();  // ווידוא שהפונקציה קראה
  });
});
