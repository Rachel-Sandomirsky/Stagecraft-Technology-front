import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DeshboardCoursesListComponent } from './components/deshboard-courses-list/deshboard-courses-list.component';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserCoursesListComponent } from './components/user-courses-list/user-courses-list.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserRequestComponent } from './components/user-request/user-request.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { QuizzesComponent } from './components/quizzes/quizzes.component';

import { TokenInterceptor } from './interceptors/TokenInterceptor';
import { ReconnectComponent } from './components/reconnect/reconnect.component';
import { AddLessonComponent } from './components/add-lesson/add-lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseComponent,
    CourseDetailsComponent,
    SearchBarComponent,
    AddCourseComponent,
    DashboardComponent,
    DeshboardCoursesListComponent,
    SignupComponent,
    LoginComponent,
    RecommendationsComponent,
    SideMenuComponent,
    VerifyEmailComponent,
    ProfileModalComponent,
    ForgotPasswordComponent,
    UserCoursesListComponent,
    UserDashboardComponent,
    UserRequestComponent,
    RegisterComponent,
    UserDetailsComponent,
    LessonsComponent,
    SafeUrlPipe,
    ReconnectComponent,
    AddLessonComponent
    QuizzesComponent,
    ReconnectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSnackBarModule,
    ToastrModule.forRoot()
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,  
      multi: true,  
    },
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
