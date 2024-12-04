import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseComponent,
    RegisterComponent,
    CourseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
