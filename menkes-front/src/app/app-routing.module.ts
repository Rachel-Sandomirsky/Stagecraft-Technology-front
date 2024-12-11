import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { RegisterComponent } from './components/register/register.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // ייבוא רכיב הדשבורד

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, // נתיב לדשבורד של מירי
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // נתיב ברירת מחדל מפנה לדשבורד
  { path: 'register/:course', component: RegisterComponent }, // עמוד הרשמה
  { path: 'courses/:code', component: CourseDetailsComponent }, // פרטי קורס
  { path: 'course-list', component: CourseListComponent }, // נתיב חדש לרשימת הקורסים (אם תצטרכי אותו מאוחר יותר)
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

