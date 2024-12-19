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
  isLoginOrSignupOpen: boolean = false; // לטשטוש המסך
  isLoginOpen: boolean = false; // האם להציג את ה-login
  isSignupOpen: boolean = false; // האם להציג את ה-signup
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

  onLoginClick() {
    this.isLoginOrSignupOpen = true;
    this.isLoginOpen = true;
    this.isSignupOpen = false;
  }

  onSignupClick() {
    this.isLoginOrSignupOpen = true;
    this.isSignupOpen = true;
    this.isLoginOpen = false;
  }

  onCloseLoginOrSignup() {
    this.isLoginOrSignupOpen = false;
    this.isLoginOpen = false;
    this.isSignupOpen = false;
  }

  ngOnDestroy(): void {}

  ngOnInit() {
    console.log('Initial isLoginOrSignupOpen:', this.isLoginOrSignupOpen);
  }
  
}
