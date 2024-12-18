import { Component, OnDestroy } from '@angular/core';
import { CourseListComponent } from "./components/course-list/course-list.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  isLoginOrSignupOpen: boolean = false;
  title = 'Match';

  constructor(private userService: UserService) {
    // האזנה לאירוע סגירת הטאב או הדפדפן
    window.addEventListener('beforeunload', this.handleUnload.bind(this));
  }

  handleUnload(event: BeforeUnloadEvent) {
    const user = this.userService.userSubject.getValue(); // שליפת המשתמש הנוכחי
    if (user && user.email && user.access_token) {
      const payload = JSON.stringify({
        email: user.email,
        token: user.access_token
      });
      console.log('Sending payload:', payload); // הדפס מה נשלח
      navigator.sendBeacon('http://localhost:3000/logout', payload);
    }
  }

  onLoginOrSignupOpen() {
    this.isLoginOrSignupOpen = true;
  }

  onCloseLoginOrSignup() {
    this.isLoginOrSignupOpen = false;
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.handleUnload.bind(this));
  }
}              