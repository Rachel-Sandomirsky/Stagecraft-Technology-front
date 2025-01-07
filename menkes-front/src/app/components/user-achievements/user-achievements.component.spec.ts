import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAchievementsComponent } from './user-achievements.component';

describe('UserAchievementsComponent', () => {
  let component: UserAchievementsComponent;
  let fixture: ComponentFixture<UserAchievementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAchievementsComponent]
    });
    fixture = TestBed.createComponent(UserAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
