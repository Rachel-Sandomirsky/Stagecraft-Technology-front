import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { RegisterComponent } from './components/register/register.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { DeshboardCoursesListComponent } from './components/deshboard-courses-list/deshboard-courses-list.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: CourseListComponent }, // ברירת מחדל ל-Dashboard
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses/:code', component: CourseDetailsComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'register/:course', component: RegisterComponent }, // גישה ל-Register לפי שם הקורס
  { path: 'courses', component: CourseListComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'dashboard-courses', component: DeshboardCoursesListComponent },
  { path: 'course-details/:code', component: CourseDetailsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}         