import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMaterialsComponent } from './admin-materials.component';

describe('AdminMaterialsComponent', () => {
  let component: AdminMaterialsComponent;
  let fixture: ComponentFixture<AdminMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMaterialsComponent]
    });
    fixture = TestBed.createComponent(AdminMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
