import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseListComponent } from "./components/course-list/course-list.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { UserService } from './services/user.service';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy, OnInit {
  isLoginOrSignupOpen: boolean = false; // לטשטוש המסך
  isLoginOpen: boolean = false; // האם להציג את ה-login
  isSignupOpen: boolean = false; // האם להציג את ה-signup
  title = 'Match';

  constructor(private userService: UserService, private modalService: ModalService) {
    // האזנה לאירוע סגירת הטאב או הדפדפן
    window.addEventListener('beforeunload', this.handleUnload.bind(this));
  }

  ngOnInit() {
    console.log('Initial isLoginOrSignupOpen:', this.isLoginOrSignupOpen);

    // האזנה לשינויים במצב המודל
    this.modalService.modalType$.subscribe((type) => {
      this.isLoginOrSignupOpen = !!type; // טשטוש רק כאשר מודל פתוח
      this.isLoginOpen = type === 'login';
      this.isSignupOpen = type === 'signup';
    });
  }

  handleUnload(event: BeforeUnloadEvent) {
    const user = this.userService.userSubject.getValue(); // שליפת המשתמש הנוכחי
    if (user && user.email && user.access_token) {
      const payload = JSON.stringify({
        email: user.email,
        token: user.access_token
      });
      console.log('Sending payload:', payload); // הדפס מה נשלח
      navigator.sendBeacon('https://menkes-2-back-1.onrender.com/logout', payload);
    }
  }

  switchModal(type: 'login' | 'signup') {
    this.modalService.switchModalType(type); // מעבר בין סוגי המודלים
  }

  onCloseLoginOrSignup() {
    this.isLoginOrSignupOpen = false; // ביטול הטשטוש
    this.isLoginOpen = false; // סגירת מודל ה-login
    this.isSignupOpen = false; // סגירת מודל ה-signup
    this.modalService.closeModal(); // סגירת המודל דרך השירות
  }
  

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.handleUnload.bind(this));
  }
}
