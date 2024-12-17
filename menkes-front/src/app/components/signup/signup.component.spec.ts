import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';  
import { RouterTestingModule } from '@angular/router/testing';  

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        ReactiveFormsModule,  
        RouterTestingModule  
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
    spyOn(component, 'onSignup');  

    component.signupForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    fixture.debugElement.nativeElement.querySelector('button').click();  

    expect(component.onSignup).toHaveBeenCalled(); 
  });
});
