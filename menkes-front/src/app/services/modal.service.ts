import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isModalOpen = new BehaviorSubject<boolean>(false); // משתנה לניהול מצב החלונית
  modalState$ = this.isModalOpen.asObservable(); // מאזין לשינויים

  private previousUrl:string='';

  constructor (private router:Router){}

  openModal() {
    this.previousUrl=this.router.url;
    this.isModalOpen.next(true); // פותח את החלונית
  }

  closeModal() {
    this.isModalOpen.next(false); // סוגר את החלונית
    if(this.previousUrl){
      this.router.navigateByUrl(this.previousUrl);
    }
  }
}
