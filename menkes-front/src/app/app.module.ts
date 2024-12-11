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
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseComponent,
    RegisterComponent,
    CourseDetailsComponent,
    SearchBarComponent,
    DashboardComponent
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
    MatTabsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
