import { Course } from './course';

describe('Course', () => {
  it('should create an instance', () => {
    const testCourse = new Course(
      'Test Title',
      1,
      'Test Description',
      'assets/img/test.jpg',
      99.99,
      4.5,
      100
    );
    expect(testCourse).toBeTruthy();
  });
});
