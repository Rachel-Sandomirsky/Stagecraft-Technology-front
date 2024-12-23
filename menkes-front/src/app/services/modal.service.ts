import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isModalOpen = new BehaviorSubject<boolean>(false); // משתנה לניהול מצב החלונית
  modalState$ = this.isModalOpen.asObservable(); // מאזין לשינויים במצב החלונית

  private modalData = new BehaviorSubject<any>(null); // משתנה לניהול הנתונים המועברים למודל
  modalData$ = this.modalData.asObservable(); // מאזין לשינויים בנתונים


  private modalType = new BehaviorSubject<string | null>(null); // משתנה לניהול סוג המודל ('login', 'signup')
  modalType$ = this.modalType.asObservable(); // מאזין לשינויים בסוג המודל

  private previousUrl: string = '';

  constructor(private router: Router) {}

  openModal(data: any = null) {
    this.previousUrl = this.router.url;
    this.modalData.next(data); // מעדכן את הנתונים המועברים למודל
    this.isModalOpen.next(true);
  }
  

  closeModal() {
    this.isModalOpen.next(false); // סוגר את החלונית
    this.modalData.next(null); // מאפס את הנתונים לאחר הסגירה
    if (this.previousUrl) {
      this.router.navigateByUrl(this.previousUrl).catch((error) => {
        console.error('Navigation error:', error);
        this.router.navigate(['/']); // נתיב ברירת מחדל במקרה של שגיאה
      });
    } else {
      this.router.navigate(['/']); // נתיב ברירת מחדל אם אין כתובת קודמת
    }
  }

    // פונקציה חדשה למעבר בין סוגי מודלים מבלי לסגור את החלון
    switchModalType(type: 'login' | 'signup'): void {
      this.modalType.next(type); // משנה את סוג המודל ל-'login' או 'signup'
    }

  getModalData(): any {
    return this.modalData.getValue(); // מחזיר את הנתונים הנוכחיים של המודל
  }

}
