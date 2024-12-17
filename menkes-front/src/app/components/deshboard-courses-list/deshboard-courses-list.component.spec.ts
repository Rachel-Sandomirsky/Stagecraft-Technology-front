import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshboardCoursesListComponent } from './deshboard-courses-list.component';

describe('DeshboardCoursesListComponent', () => {
  let component: DeshboardCoursesListComponent;
  let fixture: ComponentFixture<DeshboardCoursesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeshboardCoursesListComponent]
    });
    fixture = TestBed.createComponent(DeshboardCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
