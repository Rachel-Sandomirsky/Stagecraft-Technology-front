import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-deshboard-courses-list',
  templateUrl: './deshboard-courses-list.component.html',
  styleUrls: ['./deshboard-courses-list.component.css']
})
export class DeshboardCoursesListComponent implements OnInit {
  courses: Course[] = []
  @Output() addCourse = new EventEmitter<void>();  // אירוע להוספת קורס


  constructor(private courseService: CourseService,private router: Router) {}
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data)=>{this.courses=data},err=>{console.log(err);
    })
  }

  onAddCourseClick() {
    this.addCourse.emit(); 
  }
}
