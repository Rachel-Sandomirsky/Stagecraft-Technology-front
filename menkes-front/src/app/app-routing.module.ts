import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { RegisterComponent } from './components/register/register.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; 

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'register/:course', component: RegisterComponent }, 
  { path: 'courses/:code', component: CourseDetailsComponent }, 
  { path: 'course-list', component: CourseListComponent }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

