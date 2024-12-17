import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { CourseComponent } from "../course/course.component";
import { CourseService } from 'src/app/services/course.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  animations: [
    trigger('courseAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ]})
export class CourseListComponent implements OnInit {
  courses: Course[] = []; // The initial list of courses is empty
  filteredCourses: Course[] = []; 

  constructor(private courseService: CourseService, private router: Router,private searchService: SearchService) {}

  ngOnInit(): void {
    // Attempt to fetch courses from the API
    this.courseService.getCourses().subscribe({
      next: (data: Course[]) => { // Defined data type
        this.courses = data;
        this.filteredCourses = data;
      },
      error: (error) => {
        console.error('Failed to load courses from API:', error);
        // If an error occurs, a message can be shown to the user
      }
    });

    this.searchService.currentSearchTerm.subscribe((searchTerm) => {
      this.filterCourses(searchTerm);
    });  }
  
  // Update function to handle search properly
  filterCourses(searchTerm: string): void {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    this.filteredCourses = this.courses.filter((course) =>
      this.matchesSearch(course, lowerCaseSearchTerm)
    );
  }

  private matchesSearch(course: Course, searchTerm: string): boolean {
    return (
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.price.toString().includes(searchTerm) ||
      course.topics.some((topic) =>
        topic.toLowerCase().includes(searchTerm)
      )
    );
  }
  
  selectedCourse: Course | null = null;

  selectCourse(course: Course): void {
    this.selectedCourse = course;
  }

  clearSelection(): void {
    this.selectedCourse = null;
  }
}
