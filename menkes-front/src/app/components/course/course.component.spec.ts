import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { CourseService } from 'src/app/services/course.service';

describe('CourseService', () => {
  let service: CourseService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);
    TestBed.configureTestingModule({
      providers: [CourseService, { provide: ApiService, useValue: spy }],
    });
    service = TestBed.inject(CourseService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses successfully', (done: DoneFn) => {
    const mockCourses = [
      { title: 'Course 1', code: 101, description: 'Desc', image: '', price: 100, rating: 4.5, reviews: 10, topics: [] },
    ];
    apiServiceSpy.get.and.returnValue(of(mockCourses));

    service.getCourses().subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
      done();
    });
  });

  it('should handle errors during course fetch', (done: DoneFn) => {
    apiServiceSpy.get.and.returnValue(throwError(() => new Error('Failed to fetch')));

    service.getCourses().subscribe({
      next: () => fail('Expected an error, not courses'),
      error: (error) => {
        expect(error.message).toContain('Failed to fetch');
        done();
      },
    });
  });
});
