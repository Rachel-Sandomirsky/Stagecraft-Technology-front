import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: CourseListComponent },
  { path: 'register/:course', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

