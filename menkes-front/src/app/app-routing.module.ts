import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { RegisterComponent } from './components/register/register.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { DeshboardCoursesListComponent } from './components/deshboard-courses-list/deshboard-courses-list.component';

export const routes: Routes = [
  { path: '', component: CourseListComponent }, // ברירת מחדל ל-Dashboard
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses/:code', component: CourseDetailsComponent },
  { path: 'register/:course', component: RegisterComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'add-course', component: AddCourseComponent },
  {path:'dashboard-courses',component:DeshboardCoursesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
